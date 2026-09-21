// Mobile wallpaper.
//
// Deliberately NOT the desktop's Wallpaper component: that one is
// `fixed inset-0 -z-10`, and here the wallpaper has to sit inside the home
// screen's own stacking context so it scales with it during an app launch.
// The artwork is a gradient rather than /images/wallpaper.png, which is a 1MB
// 2880x1800 landscape image — it crops to a fraction of its width on a
// portrait phone and reads as macOS besides.
const Wallpaper = () => (
  <div className="ios-wallpaper absolute inset-0 -z-10" aria-hidden="true" />
);

export default Wallpaper;
