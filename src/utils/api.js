export const fetchWithAuth = async (url, options = {}) => {
    const token = document.cookie
      .split("; ")
      .find(row => row.startsWith("token="))
      ?.split("=")[1];
  
    if (!token) throw new Error("缺少 token");
  
    const res = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${token}`,
      },
    });
  
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  };
  