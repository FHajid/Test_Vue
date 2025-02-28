import { createI18n } from "vue-i18n";

const messages = {
  en: {
    menu: "Menu",
    username: "Username",
    language: "Language",
    listtable: "List Table",
    addproduct: "Product Table", 


    Name: "Name",
    action: "Action",
    prev : "Prev",
    next : "Next",
    Page: "Page",
    of: "Of",
    view: "View",

    add: "Add Data",
    search: "Search name...",
  },
  id: {
    menu: "Menu",
    username: "Nama Pengguna",
    language: "Bahasa",
    listtable: "Data Table",
    addproduct: "Produk Table",

    Name: "Nama",
    action: "Aksi",
    prev : "Sebelumnya",
    next : "Berikutnya",
    Page: "Halaman",
    of: "dari",
    view: "Tampilan",
    add: "Tambah Data",
    search: "Cari nama...",

  },
};

const i18n = createI18n({
  locale: "id", // Default language
  fallbackLocale: "en",
  messages,
});

export default i18n;
