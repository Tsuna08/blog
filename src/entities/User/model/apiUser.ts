import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { getDoc, getDocs, setDoc } from "firebase/firestore";

import { baseApi } from "@/app/store/baseApi";
import { getDate } from "@/shared/hooks/getDate";

import { collectionFc, docFc } from "../helpers/collection";
import { IUser, IUserRegister } from "../types/user";

export const usersApi = baseApi.enhanceEndpoints({ addTagTypes: ["Users"] }).injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation<IUser, IUserRegister>({
      async queryFn({ email, password, displayName, role = "user" }) {
        const auth = getAuth();
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        await updateProfile(user, { displayName });

        const userData = {
          id: user.uid,
          uid: user.uid,
          email: user.email,
          displayName,
          role,
          createdAt: new Date().toISOString(),
        };

        await setDoc(docFc(user.uid), userData);
        return { data: userData };
      },
      invalidatesTags: ["Users"],
    }),

    loginUser: builder.mutation<IUser, { email: string; password: string }>({
      async queryFn({ email, password }) {
        const auth = getAuth();
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        const userDoc = await getDoc(docFc(user.uid));
        const userData = { id: userDoc.id, ...userDoc.data() } as IUser;

        return { data: userData };
      },
    }),

    fetchUsers: builder.query<IUser[], void>({
      async queryFn() {
        const querySnapshot = await getDocs(collectionFc());
        const users = querySnapshot.docs.map(
          (doc) =>
            ({
              id: doc.id,
              ...doc.data(),
              createdAt: getDate(doc.data().createdAt.toDate()),
            }) as IUser,
        );
        return { data: users };
      },
      providesTags: ["Users"],
    }),

    getUserById: builder.query<IUser, string>({
      async queryFn(uid) {
        const userDoc = await getDoc(docFc(uid));
        return { data: { id: userDoc.id, ...userDoc.data() } as IUser };
      },
      providesTags: ["Users"],
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useFetchUsersQuery,
  useGetUserByIdQuery,
} = usersApi;
