// Show please wait
let showPleaseWait=(sS0)=>{
  if(document.getElementById('signIn')){
    if(sS0)document.getElementById('signIn').innerHTML=`<img class="" src="`+_pm.public+`assets/images/waiting.svg"`+(_pm.orientation==0?'width="24vw"':'height="24vh"')+`style="mix-blend-mode:screen;object-fit:cover;opacity:.86"/>`
    _pm.decam.fade(document.getElementById('signIn'),1200)
  }
}
  // Show social login
let showSocialLogin=()=>{
  if(document.getElementById('social-login')){
    document.getElementById('social-login').innerHTML=(`<label style="width:100%">
      <span hidden id="fActor"></span>
      <a class="btn btn-google btn-block text-uppercase col" style="width:100%">
        <i class="icon an an-google"></i> <span class="d-none d-sm-flex">Google</span>
      </a>
    </label>
    <label style="width:100%">
      <button class="btn btn-block text-uppercase col" onclick="guestIn();showPleaseWait(true)" style="background-color:blue;width:100%">
        <i class="icon an an-user"></i> <span class="d-none d-sm-flex">Guest</span>
      </button>
    </label>`)
  }
}
// Check if login
window.isLogIn=()=>{
    // If login do routines
}