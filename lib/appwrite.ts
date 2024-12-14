import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
  Storage,
} from "react-native-appwrite";

export const appwriteConfig = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.taras.aora",
  projectId: "674b0faa0015aa52e559",
  storageId: "674b143e0014b3b1f412",
  databaseId: "674b1283000bf240a9a8",
  userCollectionId: "674b12980019be9409ef",
  videoCollectionId: "674b12b0001311ef9c02",
};

const client = new Client()
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId)
  .setPlatform(appwriteConfig.platform);

const account = new Account(client);
const avatars = new Avatars(client);
const db = new Databases(client);

export async function signIn(email: string, password: string) {
  try {
    const sessions = await account.listSessions();
    if (sessions.total > 0) {
      await account.deleteSessions();
    }
    const session = await account.createEmailPasswordSession(email, password);

    return session;
  } catch (error: any) {
    console.log("🚀 ~ signIn ~ error==>>", error);
    throw new Error(error);
  }
}

export const createUser = async (
  email: string,
  password: string,
  username: string
) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    if (!newAccount) {
      throw new Error("Failed to create account");
    }
    const avatarUrl = avatars.getInitials(username);
    await signIn(email, password);

    const newUser = await db.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        username,
        email,
        avatar: avatarUrl,
      }
    );

    return newUser;
  } catch (error: any) {
    console.log("🚀 ~ createUser e==>>", error);
    throw new Error(error);
  }
};

export async function getCurrentUser() {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) throw Error;

    const currentUser = await db.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function signOut() {
  try {
    const session = await account.deleteSession("current");

    return session;
  } catch (error: any) {
    throw new Error(error);
  }
}
