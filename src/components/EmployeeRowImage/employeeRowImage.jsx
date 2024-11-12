const EmployeeRowImageTemplate = (rowData) => {
  return (
    <div className="flex align-items-center gap-2">
      <img
        alt="flag"
        src={rowData.avatar}
        onError={({ currentTarget }) => {
          currentTarget.onerror = null; // prevents looping
          currentTarget.src =
            "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg";
        }}
        className={`flag flag-`}
        style={{
          width: "40px",
          borderRadius: "25px",
          minHeight: "40px",
          minWidth: "40px",
        }}
      />
      <span>
        {rowData.firstName} {rowData.lastName}
      </span>
    </div>
  );
};

export default EmployeeRowImageTemplate;
