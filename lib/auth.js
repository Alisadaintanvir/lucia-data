import { Lucia } from "lucia";
import { adapter } from "./adapter";
import { cookies } from "next/headers";

const lucia = new Lucia(adapter, {
  sessionCookie: {
    expires: false,
    attributes: {
      secure: process.env.NODE_ENV === "production",
    }
  },
});

export async function createAuthSession(userId) {
  const session = await lucia.createSession(userId, {});
  const sessionCookie = await lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
}

export async function verifyAuth() {
  const sessionCokie = cookies().get(lucia.sessionCookieName);

  if (!sessionCokie) {
    return {
      user: null,
      session: null,
    };
  }

  const sessionId = sessionCokie.value;
  if (!sessionId) {
    return {
      user: null,
      session: null,
    };
  }

  const result = lucia.validateSession(sessionId);

  try {
    if (result.session && result.session.fresh) {
      const sessionCookie = lucia.createSessionCookie(result.session.id);
      cookies().set(
        sessionCokie.name,
        sessionCokie.value,
        sessionCokie.attributes
      );
    }

    if (!result.session) {
      const sessionCokie = lucia.createBlankSessionCookie();
      cookies().set(
        sessionCokie.name,
        sessionCokie.value,
        sessionCokie.attributes
      );
    }
  } catch {}

  return result;
}

export async function destroySession() {
  const { session } = await verifyAuth();
  if (!session) {
    return {
      error: "No active session found",
    };
  }

  await lucia.invalidateSession(session.id);
  const sessionCokie = lucia.createBlankSessionCookie();
  cookies().set(sessionCokie.name, sessionCokie.value, sessionCokie.attributes);
}
