<script>
    import { onMount } from "svelte";
    import api from "./api/api";

    // ==========================
    // LOGIN
    // ==========================

    let email = "";
    let password = "";
    let loading = false;

    let token = localStorage.getItem("token");
    let isLogin = token ? true : false;

    // ==========================
    // DATA BUKU
    // ==========================

    let books = [];

    let search = "";

    let judul = "";
    let penulis = "";
    let penerbit = "";
    let tahun = "";

    let editId = null;

    // =========================
    // DATA PEMINJAMAN
    // =========================

    let nama_peminjam = "";
    let judul_buku = "";
    let tanggal_pinjam = "";
    let tanggal_kembali = "";
    let status = "Dipinjam";

    let peminjaman = [];

    // ==========================
    // LOGIN
    // ==========================

    async function login() {

        loading = true;

        try {

            const res = await api.post("/auth/login", {
                email,
                password
            });

            token = res.data.token;

            localStorage.setItem("token", token);

            isLogin = true;

            await getBooks();
            await getPeminjaman();

            alert("Login berhasil");

        } catch (err) {

            if (err.response) {

                alert(err.response.data.message);

            } else {

                alert("Tidak dapat terhubung ke server");

            }

        } finally {

            loading = false;

        }

    }

    // ==========================
    // LOGOUT
    // ==========================

    function logout() {

        localStorage.removeItem("token");

        token = null;

        isLogin = false;

        books = [];

        email = "";
        password = "";

    }

    // ==========================
    // GET DATA
    // ==========================

    async function getBooks() {

        try {

            const res = await api.get("/books", {

                headers: {

                    Authorization: `Bearer ${token}`

                }

            });

            books = res.data;

        } catch (err) {

            console.log(err);

        }

    }

    async function getPeminjaman() {

        try {

            const res = await api.get("/peminjaman", {

                headers: {

                    Authorization: `Bearer ${token}`

                }

            });

            peminjaman = res.data;

        } catch (err) {

            console.log(err);

        }

    }

    async function tambahPeminjaman() {

        try {

            await api.post(

                "/peminjaman",

                {

                    nama_peminjam,

                    judul_buku,

                    tanggal_pinjam,

                    tanggal_kembali,

                    status

                },

                {

                    headers: {

                        Authorization: `Bearer ${token}`

                    }

                }

            );

            alert("Peminjaman berhasil ditambahkan");

            nama_peminjam = "";
            judul_buku = "";
            tanggal_pinjam = "";
            tanggal_kembali = "";
            status = "Dipinjam";

            getPeminjaman();

        } catch (err) {

            console.log(err);

            alert("Gagal menambahkan peminjaman");

        }

    }

    // ==========================
    // TAMBAH
    // ==========================

    async function tambahBuku() {

        try {

            await api.post(

                "/books",

                {
                    judul,
                    penulis,
                    penerbit,
                    tahun
                },

                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }

            );

            alert("Buku berhasil ditambahkan");

            judul = "";
            penulis = "";
            penerbit = "";
            tahun = "";

            await getBooks();

        } catch (err) {

            console.log(err);

        }

    }

    // ==========================
    // EDIT
    // ==========================

    function editBuku(book) {

        editId = book.id;

        judul = book.judul;

        penulis = book.penulis;

        penerbit = book.penerbit;

        tahun = book.tahun;

    }

    // ==========================
    // UPDATE
    // ==========================

    async function updateBuku() {

        try {

            await api.put(

                `/books/${editId}`,

                {
                    judul,
                    penulis,
                    penerbit,
                    tahun
                },

                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }

            );

            alert("Buku berhasil diupdate");

            editId = null;

            judul = "";
            penulis = "";
            penerbit = "";
            tahun = "";

            await getBooks();

        } catch (err) {

            console.log(err);

        }

    }

    // ==========================
    // HAPUS
    // ==========================

    async function hapusBuku(id) {

        if (!confirm("Yakin ingin menghapus buku?")) return;

        try {

            await api.delete(

                `/books/${id}`,

                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }

            );

            await getBooks();

        } catch (err) {

            console.log(err);

        }

    }

    // ==========================
    // LOAD
    // ==========================

    onMount(() => {

        if (token) {

            getBooks();

            getPeminjaman();

        }

    });

    async function kembalikanBuku(id) {

        try {

            await api.put(

                `/peminjaman/${id}`,

                {},

                {

                    headers: {

                        Authorization: `Bearer ${token}`

                    }

                }

            );

            alert("Buku berhasil dikembalikan");

            await getPeminjaman();

            await getBooks();

        } catch (err) {

            console.log(err);

        }

    }

</script>

{#if !isLogin}

<div class="container mt-5">

    <div class="row justify-content-center">

        <div class="col-md-5">

            <div class="card shadow">

                <div class="card-header bg-primary text-white text-center">

                    <h3>📚 Sistem Peminjaman Buku</h3>

                    <p class="mb-0">Silakan Login</p>

                </div>

                <div class="card-body">

                    <div class="mb-3">

                        <label class="form-label">

                            Email

                        </label>

                        <input
                            type="email"
                            class="form-control"
                            bind:value={email}
                            placeholder="Masukkan Email">

                    </div>

                    <div class="mb-3">

                        <label class="form-label">

                            Password

                        </label>

                        <input
                            type="password"
                            class="form-control"
                            bind:value={password}
                            placeholder="Masukkan Password">

                    </div>

                    <button
                        class="btn btn-primary w-100"
                        on:click={login}
                        disabled={loading}>

                        {#if loading}

                            Login...

                        {:else}

                            Login

                        {/if}

                    </button>

                </div>

            </div>

        </div>

    </div>

</div>

{:else}

<div class="container mt-4">

    <!-- HEADER -->
<div class="card shadow mb-4">

    <div class="card-body d-flex justify-content-between align-items-center">

        <div>

            <h2 class="fw-bold text-primary">
                📚 Sistem Peminjaman Buku Perpustakaan
            </h2>

            <p class="text-muted">
                Dashboard Administrator
            </p>

        </div>

        <button
            class="btn btn-danger"
            on:click={logout}>

            Logout

        </button>

    </div>

</div>

<!-- ================= Dashboard ================= -->

<div class="row mb-4">

    <div class="col-md-4">

        <div class="card border-0 shadow-lg bg-primary text-white">

            <div class="card-body text-center py-4">

                <div style="font-size:55px;">📚</div>

                <h1 class="fw-bold">{books.length}</h1>

                <p class="mb-0">Total Buku</p>

            </div>

        </div>

    </div>

    <div class="col-md-4">

        <div class="card border-0 shadow-lg bg-warning text-dark">

            <div class="card-body text-center py-4">

                <div style="font-size:55px;">📖</div>

                <h1 class="fw-bold">
                    {peminjaman.filter(x => x.status === "Dipinjam").length}
                </h1>

                <p class="mb-0">Sedang Dipinjam</p>

            </div>

        </div>

    </div>

    <div class="col-md-4">

        <div class="card border-0 shadow-lg bg-success text-white">

            <div class="card-body text-center py-4">

                <div style="font-size:55px;">✅</div>

                <h1 class="fw-bold">
                    {peminjaman.filter(x => x.status === "Dikembalikan").length}
                </h1>

                <p class="mb-0">Sudah Dikembalikan</p>

            </div>

        </div>

    </div>

</div>
    <!-- ========================= -->
    <!-- DATA PEMINJAMAN -->
    <!-- ========================= -->

    <div class="card shadow mt-4">

        <div class="card-header text-white" style="background:#1E40AF;">

            <h5 class="mb-0">
                📖 Data Peminjaman Buku
            </h5>

        </div>

        <div class="card-body">

            <div class="row">

                <div class="col-md-4 mb-3">

                    <label>Nama Peminjam</label>

                    <input
                        class="form-control"
                        bind:value={nama_peminjam}
                        placeholder="Masukkan Nama">

                </div>

                <div class="col-md-4 mb-3">

                    <label>Judul Buku</label>

                    <select
                        class="form-control"
                        bind:value={judul_buku}>

                        <option value="">
                            -- Pilih Buku --
                        </option>

                        {#each books.filter(book =>
                            !peminjaman.some(
                                p => p.judul_buku === book.judul &&
                                    p.status === "Dipinjam"
                            )
                        ) as book}

                            <option value={book.judul}>

                                {book.judul}

                            </option>

                        {/each}

                    </select>

                </div>

                <div class="col-md-4 mb-3">

                    <label>Status</label>

                    <select
                        class="form-control"
                        bind:value={status}>

                        <option value="Dipinjam">
                            Dipinjam
                        </option>

                        <option value="Dikembalikan">
                            Dikembalikan
                        </option>

                    </select>

                </div>

                <div class="col-md-6 mb-3">

                    <label>Tanggal Pinjam</label>

                    <input
                        type="date"
                        class="form-control"
                        bind:value={tanggal_pinjam}>

                </div>

                <div class="col-md-6 mb-3">

                    <label>Tanggal Kembali</label>

                    <input
                        type="date"
                        class="form-control"
                        bind:value={tanggal_kembali}>

                </div>

            </div>

            <button
                class="btn btn-primary px-4"
                on:click={tambahPeminjaman}>

                Simpan Peminjaman

            </button>

            <hr>

            <h5>Daftar Peminjaman</h5>

            <div class="table-responsive">

                <table class="table table-hover align-middle">

                    <thead class="text-white" style="background:#2563EB;">
                        <tr>
                            <th>No</th>
                            <th>Nama Peminjam</th>
                            <th>Judul Buku</th>
                            <th>Tanggal Pinjam</th>
                            <th>Tanggal Kembali</th>
                            <th>Status</th>
                            <th>Aksi</th>
                        </tr>

                    </thead>

                    <tbody>

                        {#if peminjaman.length === 0}

                            <tr>
                                <td colspan="7" class="text-center">
                                    Belum ada data peminjaman.
                                </td>
                            </tr>

                        {:else}

                            {#each peminjaman as item, index}

                            <tr>

                                <td>{index + 1}</td>

                                <td>{item.nama_peminjam}</td>

                                <td>{item.judul_buku}</td>

                                <td>{item.tanggal_pinjam}</td>

                                <td>{item.tanggal_kembali}</td>

                                <td>

                                    {#if item.status === "Dipinjam"}

                                        <span class="badge bg-warning text-dark">
                                            Dipinjam
                                        </span>

                                    {:else}

                                        <span class="badge bg-success">
                                            Dikembalikan
                                        </span>

                                    {/if}

                                </td>

                                <td>

                                    {#if item.status === "Dipinjam"}

                                        <button
                                            class="btn btn-success btn-sm"
                                            on:click={() => kembalikanBuku(item.id)}
                                        >
                                            Kembalikan
                                        </button>

                                    {:else}

                                        <span class="badge bg-secondary">
                                            Sudah Kembali
                                        </span>

                                    {/if}

                                </td>

                            </tr>

                            {/each}

                        {/if}

                    </tbody>

                </table>

            </div>

        </div>

    </div>

    <!-- FORM TAMBAH / UPDATE -->

    <div class="card shadow mb-4 mt-4">

        <div class="card-header text-white" style="background:#2563EB;">

            <h5 class="mb-0">

                {#if editId}

                    ✏️ Edit Buku

                {:else}

                    ➕ Tambah Buku

                {/if}

            </h5>

        </div>

        <div class="card-body">

            <div class="row">

                <div class="col-md-6 mb-3">

                    <label>Judul Buku</label>

                    <input
                        class="form-control"
                        bind:value={judul}
                        placeholder="Masukkan Judul Buku">

                </div>

                <div class="col-md-6 mb-3">

                    <label>Penulis</label>

                    <input
                        class="form-control"
                        bind:value={penulis}
                        placeholder="Masukkan Penulis">

                </div>

                <div class="col-md-6 mb-3">

                    <label>Penerbit</label>

                    <input
                        class="form-control"
                        bind:value={penerbit}
                        placeholder="Masukkan Penerbit">

                </div>

                <div class="col-md-6 mb-3">

                    <label>Tahun</label>

                    <input
                        type="number"
                        class="form-control"
                        bind:value={tahun}
                        placeholder="2025">

                </div>

            </div>

            {#if editId}

                <button
                    class="btn btn-warning px-4"
                    on:click={updateBuku}>

                    Update Buku

                </button>

            {:else}

                <button
                    class="btn btn-primary px-4"
                    on:click={tambahBuku}>

                    Tambah Buku

                </button>

            {/if}

        </div>

    </div>

    <!-- DAFTAR BUKU -->

    <div class="card shadow">

        <div class="card-header text-white" style="background:#1E3A8A;">

            <h5 class="mb-0">

                📚 Daftar Buku

            </h5>

        </div>

        <div class="card-body">

            <!-- SEARCH -->

            <input
    class="form-control shadow-sm"
    bind:value={search}
    placeholder="🔍 Cari judul buku...">

            <!-- TABLE -->

            <div class="table-responsive">

                <table class="table table-hover align-middle">

                     <thead class="text-white" style="background:#2563EB;">

                        <tr>

                            <th>No</th>
                            <th>ID</th>
                            <th>Judul</th>
                            <th>Penulis</th>
                            <th>Penerbit</th>
                            <th>Tahun</th>
                            <th width="180">Aksi</th>

                        </tr>

                    </thead>

                    <tbody>

                        {#if books.length === 0}

                            <tr>

                                <td colspan="7" class="text-center">

                                    Belum ada data buku.

                                </td>

                            </tr>

                        {:else}

                            {#each books
                                .filter(book =>
                                    book.judul
                                        .toLowerCase()
                                        .includes(search.toLowerCase())
                                ) as book, index}

                            <tr>

                                <td>{index + 1}</td>

                                <td>{book.id}</td>

                                <td>{book.judul}</td>

                                <td>{book.penulis}</td>

                                <td>{book.penerbit}</td>

                                <td>{book.tahun}</td>

                                <td>

                                    <button
                                        class="btn btn-warning btn-sm me-2"
                                        on:click={() => editBuku(book)}>

                                        ✏️ Edit

                                    </button>

                                    <button
                                        class="btn btn-danger btn-sm"
                                        on:click={() => hapusBuku(book.id)}>

                                        🗑 Hapus

                                    </button>

                                </td>

                            </tr>

                            {/each}

                        {/if}

                    </tbody>

                </table>

            </div>

        </div>

    </div>

</div>

{/if}