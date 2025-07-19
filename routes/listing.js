const express=require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
//const ExpressError=require("../utils/ExpressError.js");
//const {listingSchema}=require("../schema.js");
const Listing=require("../models/listing.js");
const {isLoggedIn,isOwner,validateListing}=require("../middleware.js");

const listingController=require("../controller/listings.js");

const {storage}=require("../cloudConfig.js");
const multer=require("multer");
const upload=multer({storage});

router
.route("/")
.get(wrapAsync (listingController.index))
.post(
    isLoggedIn,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync (listingController.createListing)
);

//new route
router.get("/new",isLoggedIn,listingController.renderNewForm);


router
.route("/:id")
.get(wrapAsync (listingController.showListing))
.put(
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync (listingController.updateListing)
)
.delete(isLoggedIn,isOwner,wrapAsync (listingController.deleteListing));

//index route
/*router.get("/",wrapAsync (listingController.index));*/


//show route
/*router.get("/:id",wrapAsync (listingController.showListing));*/


//create route
/*router.post(
    "/",
    isLoggedIn,
    validateListing,
    wrapAsync (listingController.createListing));*/

//edit route
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync (listingController.renderEditForm));

//update route
/*router.put("/:id",
    isLoggedIn,
    isOwner,
    validateListing,
    wrapAsync (listingController.updateListing));*/

//delete route
/*router.delete("/:id",isLoggedIn,isOwner,wrapAsync (listingController.deleteListing));*/

module.exports=router;