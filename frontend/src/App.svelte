<script>
import api from "./api/api";

let email="";
let password="";

let books=[];

async function login(){

    const res=await api.post("/auth/login",{
        email,
        password
    });

    localStorage.setItem("token",res.data.token);

    getBooks();
}

async function getBooks() {

    const token = localStorage.getItem("token");

    const res = await api.get("/books", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    console.log(res.data);

    books = res.data;
}
</script>

<h1>Login</h1>

<input bind:value={email} placeholder="Email">

<input type="password" bind:value={password} placeholder="Password">

<button on:click={login}>Login</button>

<hr>

<h2>Daftar Buku</h2>

{#each books as book}

<p>
<b>{book.judul}</b><br>
{book.penulis}
</p>

{/each}