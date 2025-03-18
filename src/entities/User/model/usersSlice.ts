import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";

import { db } from "@/app/firebase";
import { RootState } from "@/app/store/store";

import { IUser, IUserRegister } from "../types/user";

const userAdapter = createEntityAdapter<IUser>();

const initialState = userAdapter.getInitialState({
  loading: false,
  error: null as string | null,
  user: null as IUser | null,
});

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async ({ email, password, displayName, role = "user" }: IUserRegister) => {
    const auth = getAuth();
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await updateProfile(user, { displayName });
    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      email: user.email,
      displayName,
      createdAt: new Date(),
      role,
    });

    return {
      uid: user.uid,
      email: user.email,
      displayName,
      role,
      createdAt: new Date(),
    } as IUser;
  },
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async ({ email, password }: { email: string; password: string }) => {
    const auth = getAuth();
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    const userDoc = await getDoc(doc(db, "users", user.uid));
    if (!userDoc.exists()) {
      throw new Error("Пользователь не найден");
    }

    const userData = userDoc.data() as IUser;
    return userData;
  },
);

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const querySnapshot = await getDocs(collection(db, "users"));

  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as IUser);
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        userAdapter.addOne(state, action.payload);
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Ошибка регистрации";
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        userAdapter.addOne(state, action.payload);
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Ошибка авторизации";
      })
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        userAdapter.setAll(state, action.payload);
        state.loading = false;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Ошибка получения пользователей";
      });
  },
});

export const {
  selectAll: selectAllUsers,
  selectById: selectUserById,
  selectIds: selectUserIds,
} = userAdapter.getSelectors((state: RootState) => state.users);

export default userSlice.reducer;
