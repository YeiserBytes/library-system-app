export const STRAPI_BASE_URL =
  process.env.STRAPI_BASE_URL || "http://localhost:1337";

export async function getStrapiData(url: string) {
  console.log("getStrapiData");

  try {
    const response = await fetch(`${STRAPI_BASE_URL}${url}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

export async function getCurrentUserService(token: string) {
  const url = `${STRAPI_BASE_URL}/api/users/me`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching current user:", error);
    return null;
  }
}

export async function registerUserService(userData: object) {
  const url = `${STRAPI_BASE_URL}/api/auth/local/register`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
}

export async function loginUserService(userData: object) {
  const url = `${STRAPI_BASE_URL}/api/auth/local`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error login user:", error);
    throw error;
  }
}
