import { useState, useEffect } from "react";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  doc,
} from "firebase/firestore";
import { db } from "./firebase/firebase";
import { useNavigate } from "react-router-dom";
import { auth } from "./firebase/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useCallback } from "react";

function App() {
  const [slots, setSlots] = useState([]);
  const [user, setUser] = useState({});
  const [credit, setCredit] = useState({});
  const fetchCredit = useCallback(() => {
    const user = auth.currentUser;
    if (user) {
      const docRef = doc(db, "users", user.uid);
      onSnapshot(docRef, (snap) => {
        setCredit(snap.data());
      });
    }
  }, [setCredit]);

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  let navigate = useNavigate();

  const handleLogout = async () => {
    sessionStorage.removeItem("Auth Token");
    await signOut(auth);
    setCredit({});
    navigate("/login");
  };

  useEffect(() => {
    let authToken = sessionStorage.getItem("Auth Token");
    console.log(authToken);
    if (authToken) {
      navigate("/dashboard");
    }

    if (!authToken) {
      navigate("/login");
    }

    const queryAsc = query(collection(db, "slots"), orderBy("slot", "asc"));
    onSnapshot(queryAsc, (snapshot) => {
      setSlots(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });

    fetchCredit();
  }, [fetchCredit]);

  const handleModal = (seat) => {
    if (seat.data.booked || seat.data.status) {
      const url =
        "http://localhost:5002/api";
      console.log(seat);
      axios
        .post(`${url}/stripe/create-checkout-session`, {
          seat,
        })
        .then((res) => {
          if (res.data.url) {
            window.location.href = res.data.url;
          }
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  return (
    <div className="App">
      <div className="user-details">
        <div className="user-icon">
          <FontAwesomeIcon
            icon={faUserCircle}
            style={{ fontSize: "9rem", color: "white" }}
          />
          <div>
            <button onClick={() => handleLogout()}>Logout</button>
          </div>
        </div>

        <div className="user-content">
          <div className="inner-details">
            <div className="logged-user-email">Email: {user?.email}</div>
            <div className="credit">Total credits: {credit.credit}</div>
          </div>
        </div>
      </div>

      <div className="seats-wrapper">
        {slots.map((seat) => (
          <div
            key={seat.id}
            className={`slot ${
              seat.data.status || seat.data.status ? "no-transition" : ""
            }`}
            style={{
              backgroundColor: seat.data.status
                ? "rgba(128, 128, 128, 0.2)"
                : "white",
            }}
            onClick={() => {
              handleModal(seat);
            }}
          >
            {seat.data.slot}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
