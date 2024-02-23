import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
type UserData = {
    userId: string;
    name: string;
    email: string;
};

export const getUserData = (): UserData | null => {
    try {
        const token = cookies().get("token")?.value || "";
        if (!token) {
            throw new Error("Token not found in cookies");
        }

        const decodedData = jwt.verify(token, process.env.TOKEN_SERECT!);
        if (typeof decodedData !== "object" || decodedData === null) {
            throw new Error("Invalid token data");
        }
    
        const userData = decodedData as UserData;
        return userData;
    } catch (error: any) {
        console.error("Error while decoding token:", error.message);
        return null;
    }
};