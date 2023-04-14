const Navbar = () => {
  return (
    <div
      style={{
        width: "100%",
        justifyContent: "center",
        display: "flex",
        gap: 15,
        paddingTop: 40,
        paddingBottom: 40,
      }}
    >
      <div
        style={{
          display: "flex",
          borderRadius: 30,
          background: "#36007B",
          padding: "15px 60px",
        }}
      >
        <div
          style={{
            color: "white",
            display: "flex",
            gap: 25,
            zIndex: 100,
            textTransform: "uppercase",
            letterSpacing: 0.8,
            fontSize: 11,
          }}
        >
          <p
            style={{
              cursor: "pointer",
            }}
            onClick={() => {
              window.location.href = "/";
            }}
          >
            Home
          </p>
          <p>Contact Us</p>
          <p>About Us</p>
        </div>
      </div>
      <div
        style={{
          borderRadius: 30,
          background: "#7E19AD",
          padding: "15px 60px",
          textTransform: "uppercase",
          letterSpacing: 0.8,
          fontSize: 11,
        }}
      >
        <div
          style={{
            color: "white",
            cursor: "pointer",
          }}
          onClick={() => {
            window.location.href = "/create";
          }}
        >
          Create new quiz
        </div>
      </div>
    </div>
  );
};

export default Navbar;
