import React, { useState, useEffect, useRef } from "react";
import "./Header.css";
import { Drawer } from 'react-rainbow-components';
import logo from "../../images/hlogo.png";
import "../../../src/styles/globals.css";

const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMobileView, setIsMobileView] = useState(false);
    const [showCoursePopup, setShowCoursePopup] = useState(false);
    const [showServicePopup, setShowServicePopup] = useState(false);

    const drawerRef = useRef(null);

    const handleResize = () => {
        if (window.innerWidth < 992) {
            setIsMobileView(true);
            setShowCoursePopup(false);
            setShowServicePopup(false);
        } else {
            setIsMobileView(false);
            setIsMobileMenuOpen(false);
        }
    };

    useEffect(() => {
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
        if (isMobileMenuOpen) {
            setShowCoursePopup(false);
            setShowServicePopup(false);
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (drawerRef.current && !drawerRef.current.contains(event.target)) {
                setIsMobileMenuOpen(false);
                setShowCoursePopup(false);
                setShowServicePopup(false);
            }
        };

        if (isMobileMenuOpen) {
            document.addEventListener("click", handleClickOutside);
        } else {
            document.removeEventListener("click", handleClickOutside);
        }

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [isMobileMenuOpen]);

    const handleOptionSelection = () => {
        setShowCoursePopup(false);
        setShowServicePopup(false);
    };

    const handleMouseEnterSection = (section) => {
        if (section === "courses") {
            setShowCoursePopup(true);
            setShowServicePopup(false);
        } else if (section === "services") {
            setShowServicePopup(true);
            setShowCoursePopup(false);
        }
    };

    const handleMouseLeaveHeader = (event) => {
        const relatedTarget = event.relatedTarget;

        if (
            relatedTarget &&
            typeof relatedTarget.closest === "function" &&
            !relatedTarget.closest('.courses-container') &&
            !relatedTarget.closest('.services-container')
        ) {
            setShowCoursePopup(false);
            setShowServicePopup(false);
        }
    };
    return (
        <header className="header" onMouseLeave={handleMouseLeaveHeader}>
            <div className="container position-relative">
                <div className="row align-items-center header-container">
                    <div className="col-4 logo-container">
                        <a href="/" className="logo">
                            <img src={logo} alt="Hansa Technologies Logo" style={{ height: '50px', width: 'auto' }} />
                        </a>
                    </div>
                    <div className="col-8 d-none d-lg-flex justify-content-around menu-container align-items-center">
                        <p onMouseEnter={() => {
                            setShowCoursePopup(false);
                            setShowServicePopup(false);
                        }}>Home</p>
                        <div className="courses-container" onMouseEnter={() => handleMouseEnterSection("courses")}>
                            <p>Courses</p>
                            {showCoursePopup && (
                                <div className="popup-menu show">
                                    <p onClick={handleOptionSelection}>Course 1</p>
                                    <p onClick={handleOptionSelection}>Course 2</p>
                                    <p onClick={handleOptionSelection}>Course 3</p>
                                    <p onClick={handleOptionSelection}>Course 4</p>
                                    <p onClick={handleOptionSelection}>Course 5</p>
                                    <p onClick={handleOptionSelection}>Course 6</p>
                                </div>
                            )}
                        </div>
                        <div className="services-container" onMouseEnter={() => handleMouseEnterSection("services")}>
                            <p>Services</p>
                            {showServicePopup && (
                                <div className="popup-menu show">
                                    <p onClick={handleOptionSelection}>Service 1</p>
                                    <p onClick={handleOptionSelection}>Service 2</p>
                                </div>
                            )}
                        </div>

                        <p onMouseEnter={() => {
                            setShowCoursePopup(false);
                            setShowServicePopup(false);
                        }}>Blog</p>
                        <p onMouseEnter={() => {
                            setShowCoursePopup(false);
                            setShowServicePopup(false);
                        }}>Contact Us</p>
                        <p className="btn-default" onMouseEnter={() => {
                            setShowCoursePopup(false);
                            setShowServicePopup(false);
                        }}>Login</p>
                    </div>

                    {/* Mobile View with Hamburger Button and Contact */}
                    <div className="col-8 d-flex d-lg-none justify-content-end align-items-center">
                        <div className="header-btn">
                            <a className="btn-default btn-small" href="/contact-us">Contact Us</a>
                        </div>
                        <button className="hamburger-button" onClick={toggleMobileMenu}>
                            ☰
                        </button>
                    </div>
                </div>

                {isMobileView && (
                    <Drawer
                        isOpen={isMobileMenuOpen}
                        onRequestClose={toggleMobileMenu}
                        position="left"
                        size="medium"
                        className="mobile-drawer"
                        style={{
                            width: '90vw',
                            maxWidth: '90vw',
                            minWidth: '90vw',
                        }}
                    >
                        <div ref={drawerRef} className="mobile-menu">
                            <p onClick={toggleMobileMenu}>Home</p>
                            <hr />
                            <p onClick={toggleMobileMenu}>About</p>
                            <hr />
                            <div className="service-section">
                                <p onClick={() => setShowCoursePopup(!showCoursePopup)}>
                                    Courses <span style={{ marginLeft: '13rem' }}>{showCoursePopup ? '-' : '+'}</span>
                                </p>
                                {showCoursePopup && (
                                    <div className="sub-menu">
                                        <p onClick={toggleMobileMenu}>Course 1</p>
                                        <hr />
                                        <p onClick={toggleMobileMenu}>Course 2</p>
                                        <hr />
                                        <p onClick={toggleMobileMenu}>Course 3</p>
                                        <hr />
                                    </div>
                                )}
                            </div>
                            <div className="service-section">
                                <p onClick={() => setShowServicePopup(!showServicePopup)}>
                                    Services <span style={{ marginLeft: '13rem' }}>{showServicePopup ? '-' : '+'}</span>
                                </p>
                                {showServicePopup && (
                                    <div className="sub-menu">
                                        <p onClick={toggleMobileMenu}>Service 1</p>
                                        <hr />
                                        <p onClick={toggleMobileMenu}>Service 2</p>
                                        <hr />
                                        <p onClick={toggleMobileMenu}>Service 3</p>
                                        <hr />
                                        <p onClick={toggleMobileMenu}>Service 4</p>
                                        <hr />
                                        <p onClick={toggleMobileMenu}>Service 5</p>
                                        <hr />
                                        <p onClick={toggleMobileMenu}>Service 6</p>
                                        <hr />
                                        <p onClick={toggleMobileMenu}>Service 7</p>
                                        <hr />
                                        <p onClick={toggleMobileMenu}>Service 8</p>
                                        <hr />
                                    </div>
                                )}
                            </div>
                            <p onClick={toggleMobileMenu}>Blog</p>
                            <p onClick={toggleMobileMenu}>Contact Us</p>
                            <p onClick={toggleMobileMenu}>Login</p>
                        </div>
                    </Drawer>
                )}
            </div>
        </header>
    );
};

export default Header;
