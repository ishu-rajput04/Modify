import { createContext, useState } from "react";

export const SongContext = createContext();

export const SongProvider = ({ children }) => {
  const [song, setSong] = useState({
    url: "https://ik.imagekit.io/s2oh9yea4/Modify/Songs/Sanson_Ki_Mala-_Fun2Desi.Com__S5n2PN6vom",
    poster_url:
      "https://ik.imagekit.io/s2oh9yea4/Modify/Posters/Sanson_Ki_Mala-_Fun2Desi.Com__zxOVkb7w0",
    title: "Sanson Ki Mala-(Fun2Desi.Com)",
    mood: "surprised",
  });
  const [loading, setLoading] = useState(false);

  return (
    <SongContext.Provider value={{ loading, setLoading, song, setSong }}>
      {children}
    </SongContext.Provider>
  );
};
