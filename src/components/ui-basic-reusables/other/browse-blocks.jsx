import "./browse-blocks.css";

function BrowseBlocks({ subheading, blocks }) {
  return (
    <div className="browse-blocks-total">
      <p className="browse-blocks-subheading">{subheading}</p>
      <div className="browse-blocks-container">
        {blocks.map((block, index) => (
          <div
            key={index}
            className="browse-blocks-block"
            onClick={block.onClick}
          >
            {block.label}
          </div>
        ))}
      </div>
    </div>
  );
}

export default BrowseBlocks;
