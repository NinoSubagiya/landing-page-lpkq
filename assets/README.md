# TechRepairPro — Landing Page

## File Structure
  index.html                    Main HTML page
  css/styles.css                All styles
  js/main.js                    All JavaScript
  assets/
    logo.svg                    YOUR LOGO — replace this with your real logo.svg
                                The navbar and footer use: <img src="assets/logo.svg">
    instructor-mj.svg           Marcus J. avatar placeholder
    instructor-sp.svg           Sarah P. avatar placeholder
    instructor-dk.svg           David K. avatar placeholder
    banner.jpg                  [ADD] Phone mockup banner image
    icon-lcd.png                [ADD] LCD category icon
    icon-charging.png           [ADD] Charging Port icon
    icon-software.png           [ADD] Software Issue icon
    icon-audio.png              [ADD] Audio/Speaker icon
    icon-battery.png            [ADD] Battery Service icon
    icon-motherboard.png        [ADD] Motherboard icon
    icon-camera.png             [ADD] Camera Repair icon
    icon-water.png              [ADD] Water Damage icon
    README.md                   This file

## Logo
The navbar and footer both reference assets/logo.svg via an <img> tag.
Simply drop your real logo.svg into the assets/ folder to replace the placeholder.

## Adding App Mockup Images

### Banner
Save as assets/banner.jpg, then in index.html find:
  <div class="app-banner-placeholder" ...>
Replace the entire div with:
  <img class="app-banner-img" src="assets/banner.jpg" alt="Banner">

### Category Icons
Save each icon to assets/, then inside each .app-cat-icon-wrap
replace the emoji with e.g.:
  <img src="assets/icon-lcd.png" alt="LCD">

## Replacing Instructor Photos
Inside each .instructor-photo div, replace the placeholder div with:
  <img src="assets/photo.jpg" alt="Name"
       style="width:100%;height:100%;object-fit:cover;">

## Colours
Edit :root {} at the top of css/styles.css.
  --clr-accent     #2563eb  (primary blue)
  --clr-accent-lt  #60a5fa  (light blue)
