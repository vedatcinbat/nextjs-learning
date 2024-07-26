import { Lucia } from "lucia";
import { BetterSqlite3Adapter } from "@lucia-auth/adapter-sqlite";
import db from "./db";
import { cookies } from "next/headers";

const adapter = new BetterSqlite3Adapter(db, {
    user: 'users',
    session: 'sessions',
});

export const lucia = new Lucia(adapter, {
    sessionCookie: {
        expires: false,
        attributes: {
            secure: process.env.NODE_ENV === 'production'
        }
    }
});

export async function createAuthSession(userId) {
    try {
        const session = await lucia.createSession(userId, {});
        const sessionCookie = lucia.createSessionCookie(session.id);
        cookies().set(
            sessionCookie.name,
            sessionCookie.value,
            sessionCookie.attributes
        );
    } catch (error) {
        console.error("Error creating session:", error);
        throw error;
    }
}

export async function verifyAuth() {
    try {
        const sessionCookie = cookies().get(lucia.sessionCookieName);
        if (!sessionCookie) {
            return {
                user: null,
                session: null
            };
        }
        const sessionId = sessionCookie.value;

        if (!sessionId) {
            return {
                user: null,
                session: null
            };
        }

        const result = await lucia.validateSession(sessionId);

        try {
            if (result.session && result.session.fresh) {
                const sessionCookie = lucia.createSessionCookie(result.session.id);
                cookies().set(
                    sessionCookie.name,
                    sessionCookie.value,
                    sessionCookie.attributes
                );
            }
            if (!result.session) {
                const sessionCookie = lucia.createBlankSessionCookie(null);
                cookies().set(
                    sessionCookie.name,
                    sessionCookie.value,
                    sessionCookie.attributes
                );
            }
        } catch { }

        return result;

    } catch (error) {
        console.error("Error verifying session:", error);
        throw error;
    }
}

export async function destroySession() {
    const { session } = await verifyAuth();
    if (!session) {
        return {
            error: 'Unauthorized'
        }
    }

    await lucia.invalidateSession(session.id);

    const sessionCookie = lucia.createBlankSessionCookie(null);
    cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
    );
}