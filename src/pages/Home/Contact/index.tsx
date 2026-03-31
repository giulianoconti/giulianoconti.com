import { useLocale } from "../../../contexts/LocaleContext.tsx";
import { motion } from "framer-motion";
import GreenButton from "../../../components/GreenButton";
import { ASSET_CONTACT_CAT, ASSET_CONTACT_ROCKET, SOCIAL_LINKEDIN_URL } from "../../../utils/constants.ts";
import "./styles.scss";

function Contact() {
  const { t } = useLocale();

  return (
    <section className="contact" id="contact">
      <motion.div
        className="contact_container"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <motion.h2
          className="contact_title"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          {t.contact.title}
        </motion.h2>

        <p className="contact_text">{t.contact.text}</p>

        <GreenButton href={SOCIAL_LINKEDIN_URL} target="_blank" rel="noopener noreferrer">
          {t.contact.button}
        </GreenButton>
      </motion.div>
      <motion.div
        className="contact_container"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.45, ease: "easeOut", delay: 0.08 }}
      >
        <motion.div
          className="contact_container_message"
          initial={{ opacity: 0, y: -16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.35, ease: "easeOut", delay: 0.15 }}
        >
          <span className="contact_container_message_text">{t.contact.message}</span>
        </motion.div>
        <motion.img
          className="contact_container_cat"
          src={ASSET_CONTACT_CAT}
          loading="lazy"
          alt=""
          initial={{ opacity: 0, x: -36 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.4, ease: "easeOut", delay: 0.2 }}
        />
        <motion.img
          className="contact_container_rocket"
          src={ASSET_CONTACT_ROCKET}
          loading="lazy"
          alt=""
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 0.5, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.45, ease: "easeOut", delay: 0.24 }}
        />
        <div className="contact_container_chat">
          <div className="contact_container_chat_btns">
            <div className="contact_container_chat_btns_btn"></div>
            <div className="contact_container_chat_btns_btn"></div>
            <div className="contact_container_chat_btns_btn"></div>
          </div>
          <div className="contact_container_chat_msgs">
            <div className="contact_container_chat_msgs_msg">
              <div className="contact_container_chat_msgs_msg_text">
                <div className="contact_container_chat_msgs_msg_text_icons">😄😄</div>
                <div className="contact_container_chat_msgs_msg_text_info contact_container_chat_msgs_msg_text_info_w6"></div>
              </div>
              <div className="contact_container_chat_msgs_msg_pic">
                <div className="contact_container_chat_msgs_msg_pic_head"></div>
                <div className="contact_container_chat_msgs_msg_pic_body"></div>
              </div>
            </div>
            <div className="contact_container_chat_msgs_msg">
              <div className="contact_container_chat_msgs_msg_pic">
                <div className="contact_container_chat_msgs_msg_pic_head"></div>
                <div className="contact_container_chat_msgs_msg_pic_body"></div>
              </div>
              <div className="contact_container_chat_msgs_msg_text">
                <div className="contact_container_chat_msgs_msg_text_info"></div>
                <div className="contact_container_chat_msgs_msg_text_icons">🌐🪄🪄</div>
              </div>
            </div>
            <div className="contact_container_chat_msgs_msg">
              <div className="contact_container_chat_msgs_msg_text">
                <div className="contact_container_chat_msgs_msg_text_icons">✅</div>
                <div className="contact_container_chat_msgs_msg_text_info"></div>
              </div>
              <div className="contact_container_chat_msgs_msg_pic">
                <div className="contact_container_chat_msgs_msg_pic_head"></div>
                <div className="contact_container_chat_msgs_msg_pic_body"></div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export default Contact;
