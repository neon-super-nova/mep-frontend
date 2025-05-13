import "./browse-blocks.css";

function BrowseBlocks({ subheading, blocks }) {
  return (
    <div className="browse-blocks-total">
      <p className="browse-blocks-subheading">{subheading}</p>
      <div className="shared-content-wrapper">
        <div className="browse-blocks-container">
          {blocks.map((block, index) => (
            <div
              key={index}
              className="browse-blocks-block"
              onClick={block.onClick}
            >
              <span className="browse-blocks-block-label">{block.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BrowseBlocks;
