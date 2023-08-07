async function login() {
  Swal.fire({
    icon: "info",
    text: "cargando ...",
  });
  const response = await easyFetch.fetchData(
    "/api/login",
    {
      email: "login-email",
      password: "login-password",
    },
    "POST",
    true
  );
  if (response && response.status && response.status == "ok") {
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: response.msg,
      showConfirmButton: false,
      timer: 2500,
    });
    easyFetch.setCookie("dpwi", response.data.token, (path = "/"));
    setTimeout(() => {
      location.replace("/");
    }, 2000);
  } else {
    Swal.fire({
      position: "top-end",
      icon: "error",
      title: "Usuario o contraseña incorrecta",
      showConfirmButton: false,
      timer: 2500,
    });
  }
}
function closeSession() {
  easyFetch.setCookie("dpwi", "", (path = "/"));
  location.replace("/");
}
async function register() {
  let password = easyFetch.getById("register-password");
  let rpassword = easyFetch.getById("register-rpassword");
  if (password.value == "" || password.value != rpassword.value) {
    return Swal.fire({
      icon: "error",
      text: "Las contraseñas no coinciden",
    });
  }
  Swal.fire({
    icon: "info",
    text: "registrando ...",
  });
  let response = await easyFetch
    .fetchData(
      "/api/register",
      {
        email: "register-email",
        password: "register-password",
        nickname: "register-nickname",
        firstName: "register-name",
        lastName: "register-lastname",
      },
      "POST",
      true
    )
    .catch((e) => {
      console.error(e);
      return null;
    });
  if (response && response.status && response.status == "ok") {
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: response.msg,
      showConfirmButton: false,
      timer: 2500,
    });
    setTimeout(() => {
      location.replace("/");
    }, 2000);

    return;
  }
  return Swal.fire({
    position: "top-end",
    icon: "error",
    title: response.msg ? response.msg : "No se pudo conectar al servidor",
    showConfirmButton: false,
    timer: 2500,
  });
}

async function publish() {
  const contentPublication = easyFetch.getById("publication-content");
  if (contentPublication.value == "") {
    return Swal.fire({
      position: "top-end",
      icon: "error",
      title: "Debes agregar contenido a tu publicación",
      showConfirmButton: false,
      timer: 1500,
    });
  }
  Swal.fire({
    icon: "info",
    text: "publicando ...",
  });
  publicationPlaceHolder(true);
  const response = await easyFetch
    .fetchData(
      "/feed/api/publication/push",
      {
        content: "publication-content",
      },
      "POST",
      true
    )
    .catch((e) => {
      console.error("Error Fetching Publish", e);
      return null;
    });
  if (response && response.status && response.status == "ok") {
    getPublications();
    return Swal.fire({
      position: "top-end",
      icon: "success",
      title: response.msg,
      showConfirmButton: false,
      timer: 1000,
    });
  }
  return Swal.fire({
    position: "top-end",
    icon: "error",
    title: "No se pudo publicar el post",
    showConfirmButton: false,
    timer: 1000,
  });
}
async function getPublications(id=null) {
  publicationPlaceHolder(true);
  let publications = easyFetch.getById("publications");
  let uri = "";
  if(id==null){
    uri = "/feed/api/publication/getall";
  } else if(id=="my"){
    uri = "/feed/api/my/publication/getall";
  } else {
    uri = "/feed/api/"+id+"/publication/getall";
  }
  
  const response = await easyFetch
    .fetchData(uri, {}, "POST", false)
    .catch((e) => {
      console.error("Error Fetching Publish", e);
      return null;
    });
  if (response && response.status && response.status == "ok") {
    let dataPublications = "";
    for (let i = 0; i < response.data.length; i++) {
      let model = `
      <div class="row mt-2">
        <div class="col-md-12 border rounded-3 placeholder-glow">
          <div class="row">
            <div class="col-3"> Autor: ${response.data[i].firstname}  ${
        response.data[i].lastname
      } </div>
            <div class="col-9 text-right"> ${dateformat(
              response.data[i].date
            )} </div>
          </div>
          <hr/>
          <div class="row">
            <div class="col-md-12 text-justify">
              ${response.data[i].content}
            </div>
          </div>
        </div> 
      </div>
      `;
      dataPublications = dataPublications + model;
    }
    publications.innerHTML = dataPublications;
  }
}
function publicationPlaceHolder(isloading) {
  if (isloading) {
    let publications = easyFetch.getById("publications");
    let model = `<div class="row mt-2"><div class="col-md-12 border rounded-3 placeholder-glow"> <span class="placeholder col-7"></span><span class="placeholder col-4"></span><span class="placeholder col-4"></span><span class="placeholder col-6"></span><span class="placeholder col-8"></span></div></div><div class="row mt-2"><div class="col-md-12 border rounded-3 placeholder-glow"> <span class="placeholder col-7"></span><span class="placeholder col-4"></span><span class="placeholder col-4"></span><span class="placeholder col-6"></span><span class="placeholder col-8"></span></div></div><div class="row mt-2"><div class="col-md-12 border rounded-3 placeholder-glow"> <span class="placeholder col-7"></span><span class="placeholder col-4"></span><span class="placeholder col-4"></span><span class="placeholder col-6"></span><span class="placeholder col-8"></span></div></div><div class="row mt-2"><div class="col-md-12 border rounded-3 placeholder-glow"> <span class="placeholder col-7"></span><span class="placeholder col-4"></span><span class="placeholder col-4"></span><span class="placeholder col-6"></span><span class="placeholder col-8"></span></div></div><div class="row mt-2"><div class="col-md-12 border rounded-3 placeholder-glow"> <span class="placeholder col-7"></span><span class="placeholder col-4"></span><span class="placeholder col-4"></span><span class="placeholder col-6"></span><span class="placeholder col-8"></span></div></div><div class="row mt-2"><div class="col-md-12 border rounded-3 placeholder-glow"> <span class="placeholder col-7"></span><span class="placeholder col-4"></span><span class="placeholder col-4"></span><span class="placeholder col-6"></span><span class="placeholder col-8"></span></div></div><div class="row mt-2"><div class="col-md-12 border rounded-3 placeholder-glow"> <span class="placeholder col-7"></span><span class="placeholder col-4"></span><span class="placeholder col-4"></span><span class="placeholder col-6"></span><span class="placeholder col-8"></span></div></div><div class="row mt-2"><div class="col-md-12 border rounded-3 placeholder-glow"> <span class="placeholder col-7"></span><span class="placeholder col-4"></span><span class="placeholder col-4"></span><span class="placeholder col-6"></span><span class="placeholder col-8"></span></div></div><div class="row mt-2"><div class="col-md-12 border rounded-3 placeholder-glow"> <span class="placeholder col-7"></span><span class="placeholder col-4"></span><span class="placeholder col-4"></span><span class="placeholder col-6"></span><span class="placeholder col-8"></span></div></div><div class="row mt-2"><div class="col-md-12 border rounded-3 placeholder-glow"> <span class="placeholder col-7"></span><span class="placeholder col-4"></span><span class="placeholder col-4"></span><span class="placeholder col-6"></span><span class="placeholder col-8"></span></div></div>`;
    publications.innerHTML = model;
  }
}
function dateformat() {
  const originalDateString = "2023-08-01T20:31:26.220Z";
  const formattedDate = new Date(originalDateString).toLocaleString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });
  return formattedDate;
}
function changeView(view=null){
  if(!view || view=="allposts"){
    let h1 = "Todas las Publicaciones"
    getPublications();
  }else if(view=="myposts"){
    let h1 = "Mis Publicaciones"
    getPublications("my");
  }
  else if(view>0){
    let h1 = "Sus Publicaciones"
    getPublications(view);
  }
}
