interface Props {
  endDate: Date | undefined;
  startDate: Date | undefined;
}

const durationFormatter = ({ endDate, startDate }: Props) => {
  let results = "";

  if (startDate)
    results = `From ${startDate.toLocaleDateString("en-UK", {
      year: "numeric",
      month: "long",
    })}`;

  if (startDate && !endDate) results = results + " to present";

  if (startDate && endDate)
    results =
      results +
      ` to ${endDate.toLocaleDateString("en-UK", {
        year: "numeric",
        month: "long",
      })}`;

  return results;
};

export default durationFormatter;
