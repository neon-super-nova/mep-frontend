import "../page-elements/footer.css";

function Footer() {
  return (
    <footer className="master-footer">
      <p className="master-footer-p">
        Questions or Feedback? Contact us at
        <span className="master-footer-space" />
        <a
          href="mailto:mep.misenplate@gmail.com?subject=Recipe App Feedback"
          className="master-footer-a"
        >
          mep.misenplate@gmail.com
        </a>
      </p>
    </footer>
  );
}

export default Footer;
