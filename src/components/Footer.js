import React from "react";
import "../styles/footer.css";
import { Link } from "react-router-dom";
import { BsTelephoneFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { BsYoutube, BsFacebook, BsGithub } from "react-icons/bs";
import {
  AiFillInstagram,
  AiOutlineTwitter,
  AiFillCopyrightCircle,
} from "react-icons/ai";
import Translate from '../Translate';
import { useTranslate } from "../Translate";
import {useLanguageContext} from '../context/language_context';

function Footer() {
  const {language} = useLanguageContext();
  return (
    <footer className={language=='kh'?"font-khmer":"font-poppin"} id="footer">
      <div className="section1">
        <div className="contact-us">
          <h3>{<Translate>Contact Us</Translate>}</h3>
          <p>{<Translate>foot_send_us_a_message</Translate>}</p>
          <form>
            <div>
              <input type="text" placeholder={useTranslate("foot_full_name")} />
            </div>
            <div>
              <input type="text" placeholder={useTranslate("foot_your_email")} />
            </div>
            <div>
              <textarea
                name=""
                id=""
                cols="30"
                rows="5"
                placeholder={useTranslate("foot_your_message")}
              ></textarea>
            </div>
            <Link className="send-btn" to="">
              <Translate>foot_send</Translate>
            </Link>
          </form>
        </div>
        <div className="about-us">
          <h3><Translate>foot_about_us</Translate></h3>
          <p><Translate>foot_about_us_description</Translate></p>
          <ul>
            <li><Translate>foot_quantity</Translate></li>
            <li><Translate>foot_reliability</Translate></li>
            <li><Translate>foot_easy_for_payment</Translate></li>
            <li><Translate>foot_fast_delivery</Translate></li>
          </ul>
        </div>
        <div className="logo">
          <Link to="/">
            <font>W</font>
            <font>s</font>
            <font>book</font>
          </Link>
          <div className="contact-links">
            <div className="contact-phone">
              <a href="tel:086676682">
                <span>
                  <BsTelephoneFill />
                </span>
                <span>(855)86-676-682</span>
              </a>
            </div>
            <div className="contact-email">
              <a href="mailto:wsbook.team@gmail.com">
                <span>
                  <MdEmail />
                </span>
                <span>wsbook.team@gmail.com</span>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="section2">
        <ul>
          <li>
            <a>
              <BsGithub />
            </a>
          </li>

          <li>
            <a>
              <BsFacebook />
            </a>
          </li>
          <li>
            <a>
              <AiFillInstagram />
            </a>
          </li>
          <li>
            <a>
              <AiOutlineTwitter />
            </a>
          </li>
          <li>
            <a>
              <BsYoutube />
            </a>
          </li>
        </ul>
      </div>
      <div className="copy-right">
        <a>
          <AiFillCopyrightCircle />
        </a>
        <p>Copyright 2021 | All Right Reserved by Wsbook's Team</p>
      </div>
    </footer>
  );
}

export default Footer;
