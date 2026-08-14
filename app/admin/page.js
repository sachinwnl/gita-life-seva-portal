"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function Admin() {
  const [topic, setTopic] = useState("Who am I beyond this body?");
  const [date, setDate] = useState("2026-08-16");
  const [time, setTime] = useState("5:30 PM");

  

  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [sevas, setSevas] = useState([]);
  useEffect(() => {
  const loadSevas = async () => {
    const { data, error } = await supabase
      .from("sevas")
      .select("*")
      .order("id");

    if (error) {
      console.error("SEVAS ERROR:", error);
      return;
    }

    setSevas(data || []);
  };

  loadSevas();
}, []);

  const saveProgram = async () => {
    setSaving(true);
    setSaved(false);
    setMessage("");

    const { error } = await supabase
      .from("gita_programs")
      .insert({
        program_date: date,
        program_time: time,
        topic: topic,
      });

    setSaving(false);

    if (error) {
      const errorText =
        error.message ||
        error.details ||
        error.hint ||
        "Supabase could not save the program.";

      setMessage(`Supabase error: ${errorText}`);
      return;
    }

    setSaved(true);
    setMessage("Program saved successfully.");
  };

  return (
    <main style={styles.page}>
      <header style={styles.header}>
        <div>
          <div style={styles.kicker}>GITA LIFE · ADMIN</div>
          <h1 style={styles.title}>
            Seva
            <br />
            <i>Control.</i>
          </h1>
        </div>

        <a href="/" style={styles.back}>
          ← Public Portal
        </a>
      </header>

      <section style={styles.intro}>
        <div>
          <span style={styles.label}>ADMIN DASHBOARD</span>
          <h2 style={styles.introTitle}>
            Manage the
            <br />
            Gita Life Seva Portal.
          </h2>
        </div>

        <p>
          Manage bookings, sevas, locations, Sunday programmes,
          ślokas and highlights from one place.
        </p>
      </section>

      <section style={styles.grid}>

        {/* SUNDAY PROGRAM */}
        <section style={styles.card}>
          <span style={styles.cardLabel}>01 · SUNDAY PROGRAM</span>

          <h3 style={styles.cardTitle}>Gita Life</h3>

          <label style={styles.inputLabel}>DATE</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            style={styles.input}
          />

          <label style={styles.inputLabel}>TIME</label>
          <input
            type="text"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            style={styles.input}
            placeholder="5:30 PM"
          />

          <label style={styles.inputLabel}>TOPIC</label>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            style={styles.input}
            placeholder="Enter Sunday topic"
          />

          <button
            onClick={saveProgram}
            disabled={saving}
            style={{
              ...styles.button,
              opacity: saving ? 0.6 : 1,
            }}
          >
            {saving
              ? "SAVING..."
              : saved
              ? "✓ SAVED"
              : "SAVE PROGRAM →"}
          </button>

          {message && (
            <p
              style={{
                ...styles.message,
                color: saved ? "#38734b" : "#a23b32",
              }}
            >
              {message}
            </p>
          )}
        </section>

        {/* BOOKINGS */}
        <section style={styles.card}>
          <span style={styles.cardLabel}>02 · BOOKINGS</span>

          <h3 style={styles.cardTitle}>Daily Seva</h3>

          <div style={styles.stat}>
            <strong>18</strong>
            <span>Today's bookings</span>
          </div>

          <div style={styles.stat}>
            <strong>7</strong>
            <span>Book Distribution</span>
          </div>

          <div style={styles.stat}>
            <strong>6</strong>
            <span>Temple Seva</span>
          </div>

          <div style={styles.stat}>
            <strong>5</strong>
            <span>Other Sevas</span>
          </div>

          <button style={styles.button}>
            VIEW ALL BOOKINGS →
          </button>
        </section>

        {/* SEVAS */}
        <section style={styles.card}>
          <span style={styles.cardLabel}>03 · SEVA MANAGEMENT</span>

          <h3 style={styles.cardTitle}>Sevas</h3>

          <p style={styles.description}>
            Add, edit, hide or remove the seva opportunities
            available to devotees.
          </p>

         <div style={styles.list}>
  {sevas.map((seva) => (
    <div key={seva.id} style={styles.listItem}>
      <span>{seva.name}</span>
      <span>Active</span>
    </div>
  ))}
</div>

<button style={styles.button}>
  MANAGE SEVAS →
</button>

        </section>

        {/* SLOKA */}
        <section style={styles.card}>
          <span style={styles.cardLabel}>04 · DAILY INSPIRATION</span>

          <h3 style={styles.cardTitle}>Today's Śloka</h3>

          <div style={styles.verse}>
            <small>BHAGAVAD-GĪTĀ 18.68</small>

            <p style={styles.sanskrit}>
              ya idaṁ paramaṁ guhyaṁ
              <br />
              mad-bhakteṣv abhidhāsyati
            </p>

            <p>
              “One who explains this supreme secret to My devotees
              will certainly attain pure devotional service.”
            </p>
          </div>

          <button style={styles.button}>
            CHANGE ŚLOKA →
          </button>
        </section>

        {/* HIGHLIGHTS */}
        <section style={styles.card}>
          <span style={styles.cardLabel}>05 · PROGRAM HIGHLIGHTS</span>

          <h3 style={styles.cardTitle}>Highlights</h3>

          <p style={styles.description}>
            Add photos, videos and descriptions of completed
            Gita Life programmes and special events.
          </p>

          <button style={styles.button}>
            ADD HIGHLIGHT →
          </button>
        </section>

        {/* CONTACT */}
        <section style={styles.card}>
          <span style={styles.cardLabel}>06 · CONTACT</span>

          <h3 style={styles.cardTitle}>
            Learn · Serve · Connect
          </h3>

          <p style={styles.description}>
            Manage the contact numbers and communication details
            displayed on the public portal.
          </p>

          <button style={styles.button}>
            MANAGE CONTACTS →
          </button>
        </section>

      </section>
    </main>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f3eee6",
    color: "#171512",
    fontFamily: "Arial, sans-serif",
  },

  header: {
    padding: "35px 7vw",
    borderBottom: "1px solid #cfc6b9",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },

  kicker: {
    fontSize: "10px",
    letterSpacing: "3px",
    fontWeight: "700",
  },

  title: {
    fontSize: "clamp(55px, 8vw, 110px)",
    lineHeight: "0.85",
    letterSpacing: "-5px",
    margin: "30px 0 0",
  },

  back: {
    color: "#171512",
    textDecoration: "none",
    fontSize: "11px",
    letterSpacing: "1px",
  },

  intro: {
    padding: "80px 7vw",
    background: "#e5d9c9",
    display: "flex",
    justifyContent: "space-between",
    gap: "50px",
    flexWrap: "wrap",
  },

  label: {
    fontSize: "10px",
    letterSpacing: "3px",
    fontWeight: "700",
  },

  introTitle: {
    fontSize: "50px",
    lineHeight: "1",
    marginTop: "25px",
  },

  grid: {
    padding: "60px 7vw",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "1px",
    background: "#cfc6b9",
  },

  card: {
    background: "#f3eee6",
    padding: "35px",
    minHeight: "390px",
  },

  cardLabel: {
    fontSize: "9px",
    letterSpacing: "2px",
    color: "#8c4d32",
    fontWeight: "700",
  },

  cardTitle: {
    fontSize: "34px",
    margin: "22px 0",
  },

  inputLabel: {
    display: "block",
    marginTop: "22px",
    fontSize: "9px",
    letterSpacing: "2px",
    color: "#777",
  },

  input: {
    width: "100%",
    border: "0",
    borderBottom: "1px solid #aaa",
    background: "transparent",
    padding: "10px 2px",
    fontSize: "14px",
    outline: "none",
  },

  button: {
    marginTop: "28px",
    padding: "13px 18px",
    background: "#171512",
    color: "#fff",
    border: "0",
    fontSize: "9px",
    letterSpacing: "1.5px",
    cursor: "pointer",
  },

  message: {
    fontSize: "12px",
    marginTop: "15px",
  },

  stat: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid #d5cec3",
    padding: "15px 0",
  },

  description: {
    color: "#6f6a63",
    lineHeight: "1.7",
    fontSize: "13px",
    marginTop: "25px",
  },

  list: {
    marginTop: "25px",
    borderTop: "1px solid #d5cec3",
  },

  listItem: {
    padding: "12px 0",
    borderBottom: "1px solid #d5cec3",
    display: "flex",
    justifyContent: "space-between",
    gap: "15px",
  },

  verse: {
    marginTop: "25px",
    padding: "22px",
    background: "#e5d9c9",
    lineHeight: "1.7",
    fontSize: "13px",
  },

  sanskrit: {
    fontFamily: "Georgia, serif",
    fontSize: "20px",
    lineHeight: "1.5",
  },
};