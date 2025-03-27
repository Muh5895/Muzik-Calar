import React, { useState, useEffect } from "react";
import supabase from "./supabaseClient"; // Supabase bağlantısı

function App() {
  const [user, setUser] = useState(null);
  const [bots, setBots] = useState([]);
  const [botName, setBotName] = useState("");
  const [botDescription, setBotDescription] = useState("");

  useEffect(() => {
    // Kullanıcı bilgilerini alıyoruz
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data) setUser(data);
    };

    fetchUser();
  }, []);

  // Botları alıyoruz
  const fetchBots = async () => {
    const { data, error } = await supabase
      .from("bots")
      .select("*")
      .eq("user_id", user?.id); // Kullanıcıya ait botları alıyoruz
    if (data) {
      setBots(data);
    }
  };

  // Yeni bot oluşturma işlemi
  const createBot = async () => {
    const { data, error } = await supabase
      .from("bots")
      .insert([{ user_id: user.id, bot_name: botName, description: botDescription }]);
    if (data) {
      fetchBots();
      setBotName("");
      setBotDescription("");
    }
  };

  // Botları listeleme ve bot ekleme
  return (
    <div>
      <h1>Discord Bot Yönetim Paneli</h1>
      {!user ? (
        <button onClick={() => supabase.auth.signInWithOAuth({ provider: "google" })}>Giriş Yap</button>
      ) : (
        <div>
          <h2>Hoşgeldiniz, {user.email}</h2>
          <button onClick={() => supabase.auth.signOut()}>Çıkış Yap</button>

          <h3>Botlarınız</h3>
          <button onClick={fetchBots}>Botları Göster</button>
          <div>
            {bots.length > 0 ? (
              <ul>
                {bots.map((bot) => (
                  <li key={bot.id}>
                    <h4>{bot.bot_name}</h4>
                    <p>{bot.description}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>Botunuz yok. Yeni bot oluşturun!</p>
            )}
          </div>

          <h3>Yeni Bot Oluştur</h3>
          <input
            type="text"
            placeholder="Bot Adı"
            value={botName}
            onChange={(e) => setBotName(e.target.value)}
          />
          <textarea
            placeholder="Bot Açıklaması"
            value={botDescription}
            onChange={(e) => setBotDescription(e.target.value)}
          />
          <button onClick={createBot}>Bot Oluştur</button>
        </div>
      )}
    </div>
  );
}

export default App;
