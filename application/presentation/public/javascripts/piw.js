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
  if (response?.status && response.status == "ok") {
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: response.msg,
      showConfirmButton: false,
      timer: 2500,
    });
    let path = "/";
    easyFetch.setCookie("dpwi", response.data.token, (path));
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
  let path = "/";
  easyFetch.setCookie("dpwi", "", (path));
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
  if (response?.status && response.status == "ok") {
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
  if (response?.status && response.status == "ok") {
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
async function getPublications(id = null) {
  publicationPlaceHolder(true);
  let publications = easyFetch.getById("publications");
  let uri = "";
  if (id == null) {
    uri = "/feed/api/publication/getall";
  } else if (id == "my") {
    uri = "/feed/api/my/publication/getall";
  } else {
    uri = "/feed/api/" + id + "/publication/getall";
  }

  const response = await easyFetch
    .fetchData(uri, {}, "POST", false)
    .catch((e) => {
      console.error("Error Fetching Publish", e);
      return null;
    });
  if (response?.status && response.status == "ok") {
    let dataPublications = "";
    for (const element of response.data) {
      let model = `
      <div class="row mt-2">
        <div class="col-md-12 border rounded-3 placeholder-glow">
          <div class="row">
            <div class="col-3"> Autor: ${element.firstname}  ${
        element.lastname
      } </div>
            <div class="col-9 text-right"> ${dateformat(
              //element.date
            )} </div>
          </div>
          <hr/>
          <div class="row">
            <div class="col-md-12 text-justify">
              <div class="row">
                <div class="col">
                  ${element.content}
                </div>
              </div>
              <div class="row"> 
                  <div class="col"> 
                      <hr/>
                  </div>
              </div>
              <div class="row"> 
                  <div class="col"> 
                      <a href="/feed/post/${
                        element.id
                      }"> Comentarios </a>
                  </div>
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
async function publishComment(id) {
  const contentComment = easyFetch.getById("comment-content");
  if (contentComment.value == "") {
    return Swal.fire({
      position: "top-end",
      icon: "error",
      title: "Debes agregar contenido a tu publicación",
      showConfirmButton: false,
      timer: 1500,
    });
  }
  commentsPlaceHolder();
  const response = await easyFetch
    .fetchData(
      "/feed/api/post/comments/create",
      {
        content: "comment-content",
        id: id,
      },
      "POST",
      true
    )
    .catch((e) => {
      console.error("Error Fetching Publish", e);
      return null;
    });
  if (response?.status && response.status == "ok") {
    getComments(id);
    return;
  }
  return Swal.fire({
    position: "top-end",
    icon: "error",
    title: "No se pudo publicar el comentario",
    showConfirmButton: false,
    timer: 1000,
  });
}
async function getComments(id) {
  let comments = easyFetch.getById("comments");
  let commentsData = "";
  commentsPlaceHolder();
  const response = await easyFetch
    .fetchData("/feed/api/post/" + id + "/comments/get", {}, "POST", true)
    .catch((e) => {
      console.error("Error Fetching Publish", e);
      return null;
    });
  if (response?.status && response.status == "ok") {
    if (response.data.length && response.data.length > 0) {
      for (const element of response.data) {
        let single = `
        <div class="col-md-12 mt-1 p-1 border rounded-3 text-left"><div class="row"><div class="col-3"> <b>${element.firstname} ${element.lastname}</b></div><div class="col-9"> 
        ${element.content}</div></div></div>
        `;
        commentsData = commentsData + single;
      }
    } else {
      commentsData = `<b>Se el primero en comentar</b>`;
    }
    comments.innerHTML = commentsData;
  }
}
function commentsPlaceHolder() {
  let comments = easyFetch.getById("comments");
  comments.innerHTML = `
  <div class="col-md-12 mt-1 p-1 border rounded-3 text-left"><div class="row"><div class="col-3"> <span class="placeholder col-3"></span></div><div class="col-9"> <span class="placeholder col-7"></span></div></div></div><div class="col-md-12 mt-1 p-1 border rounded-3 text-left"><div class="row mt-1"><div class="col-3"> <span class="placeholder col-4"></span></div><div class="col-9"> <span class="placeholder col-9"></span></div></div></div><div class="col-md-12 mt-1 p-1 border rounded-3 text-left"><div class="row"><div class="col-3"> <span class="placeholder col-6"></span></div><div class="col-9"> <span class="placeholder col-5"></span></div></div></div><div class="col-md-12 mt-1 p-1 border rounded-3 text-left"><div class="row"><div class="col-3"> <span class="placeholder col-3"></span></div><div class="col-9"> <span class="placeholder col-7"></span></div></div></div><div class="col-md-12 mt-1 p-1 border rounded-3 text-left"><div class="row"><div class="col-3"> <span class="placeholder col-4"></span></div><div class="col-9"> <span class="placeholder col-9"></span></div></div></div><div class="col-md-12 mt-1 p-1 border rounded-3 text-left"><div class="row"><div class="col-3"> <span class="placeholder col-2"></span></div><div class="col-9"> <span class="placeholder col-5"></span></div></div></div>
  `;
}
function changeView(view = null) {
  if (!view || view == "allposts") {
    //"Todas las Publicaciones";
    getPublications();
  } else if (view == "myposts") {
    //"Mis Publicaciones";
    getPublications("my");
  } else if (view > 0) {
    //"Sus Publicaciones";
    getPublications(view);
  }
}

async function sendMessage(id) {
  let response = await easyFetch
    .fetchData(
      "/messenger/api/registMessage",
      {
        content: "content-message",
        user2: id,
      },
      "POST",
      true
    )
    .catch((e) => {
      console.error(e);
      return null;
    });
  if (response?.status && response.status == "ok") {
    getMessage(id);
    let message = easyFetch.getById("content-message");
    message.value = "";
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
async function getMessage(id) {
  let messages = easyFetch.getById("messages");
  let messagesData = "";
  let response = await easyFetch
    .fetchData(
      "/messenger/api/getMessages",
      {
        user1: id,
      },
      "POST",
      true
    )
    .catch((e) => {
      console.error(e);
      return null;
    });
  if (response?.status && response.status == "ok") {
    for (const element of response.data) {
      if (response.my == element.userid) {
        let single = `
        <div class="my-2">
         <div class="row"> 
         <div class="col-md-6"></div>
        <div class="right col-md-6">${element.content}</div>
        </div>
        </div>
        `;
        messagesData = messagesData + single;
      } else {
        let single = `
        <div class="my-2">
        <div class="row"> 
          <div class="left col-md-6">${element.content}</div>
          </div>
          </div>
        `;
        messagesData = messagesData + single;
      }
      messages.innerHTML = messagesData;
    }
    if (messagesData == "") messages.innerHTML = `<b>Aún no hay mensajes</b>`;
  } else {
    messages.innerHTML = `<b>Error al recibir mensajes</b>`;
  }
}
async function reaction(id) {
  let response = await easyFetch
    .fetchData(
      "/feed/api/post/" + id + "/reactions/create",
      {
        id: id,
      },
      "POST",
      true
    )
    .catch((e) => {
      console.error(e);
      return null;
    });
  if (response?.status && response.status == "ok") {
    getReactions(id);
  }
}
async function getReactions(id) {
  let reaction = easyFetch.getById("reaction");
  let inFor= false;
  let response = await easyFetch
    .fetchData(
      "/feed/api/post/" + id + "/reactions/get",
      {
        id: id,
      },
      "POST",
      true
    )
    .catch((e) => {
      console.error(e);
      return null;
    });
  if (response?.status && response.status == "ok") {
    for (const element of response.data) {
      if (element.user_id == response.my) {
        inFor=true;
        let single = `
          <span>${response.data.length}</span>
          <a href="javascript:unReaction(${id})">
            <img src="/images/like.png" width="20px"/> Diste Piw
          </a>
        `;
        reaction.innerHTML = single;
      }
    }
    if(!inFor){
      let single1 = `
        <span>${response.data.length}</span>
        <a href="javascript:reaction(${id})">
          <img src="/images/like.png" width="20px"/> Dar Piw
        </a>
      `;
      reaction.innerHTML = single1;
    }
  }
}
async function unReaction(id) {
  let response = await easyFetch
    .fetchData(
      "/feed/api/post/" + id + "/reactions/delete",
      {
        id: id,
      },
      "POST",
      true
    )
    .catch((e) => {
      console.error(e);
      return null;
    });
  if (response?.status && response.status == "ok") {
    getReactions(id);
  }
}
