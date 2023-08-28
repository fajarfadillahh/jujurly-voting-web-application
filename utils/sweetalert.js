import Swal from "sweetalert2";

function launchToast(icon, message) {
  Swal.fire({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    text: message,
    timer: 2000,
    icon,
    timerProgressBar: true,
  });
}

function launchAlert(title, message, icon) {
  Swal.fire({
    title,
    text: message,
    icon,
  });
}

export { launchToast, launchAlert };
