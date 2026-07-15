<script>
    import api from "./api/api";

    let email = "";
    let password = "";

    async function login() {
        try {
            const res = await api.post("/auth/login", {
                email,
                password
            });

            localStorage.setItem("token", res.data.token);

            alert("Login Berhasil!");

        } catch (err) {
            alert("Email atau Password salah");
            console.log(err);
        }
    }
</script>

<h1>Login Perpustakaan</h1>

<input
    type="email"
    bind:value={email}
    placeholder="Email">

<br><br>

<input
    type="password"
    bind:value={password}
    placeholder="Password">

<br><br>

<button on:click={login}>
    Login
</button>