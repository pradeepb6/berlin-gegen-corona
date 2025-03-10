import copyToClipboard from "./copyToClipboard";
import { Clinic, keyToHeaderMap } from "./data";

const keysOrder: (keyof Clinic)[] = [
  "key_0",
  "key_1",
  "key_2",
  "key_7",
  "key_8",
  "key_3",
  "key_4",
  "key_12",
  "key_9",
  "key_5",
  "key_6",
  "key_11",
  "key_10",
  "key_13",
  "key_14",
];

export default function ClinicCard({ clinic }: { clinic: Clinic }) {
  return (
    <div className=" p-3 bg-white rounded-lg w-full subpixel-antialiased shadow-md">
      {keysOrder.map((key) => {
        let value =
          key === "key_8" ? removeWhiteSpace(clinic[key]) : clinic[key];
        if (!value || value.trim().length === 0) return null;

        if (key === "key_2") value = `${value}, ${clinic.key_1}`;
        if (key === "key_1") return null;

        return (
          <div>
            <span className="text-sm font-medium capitalize font-mono">
              {keyToHeaderMap[key]}:{" "}
            </span>

            <DetailsRow field={key} value={value} />
          </div>
        );
      })}
    </div>
  );
}

function DetailsRow({ field, value }: { field: keyof Clinic; value: string }) {
  let elem: string;
  
  switch(field) {
    case "key_2":
      elem = generateGoogleMapsLink(value);
      break;
    case "key_8":
      elem = `<a className="font-semibold text-sm" href="mailto:${value}"> ${value} </a>`;
      break;
    case "key_9":
    case "key_12":
        elem = sanitizeLink(removeWhiteSpace(value));;
        break;
    case "key_11":
    case "key_10":
    case "key_13":
    case "key_14":
      elem = sanitizeLink(value);
      break;
    case "key_7":
      elem = `<a href="tel:${value}">${value}</a>`;
      break;
    default:
      elem = `<span data-value={value} onClick={ ${copyToClipboard} } style={{ cursor: "copy" }}> ${value} </span>`;
  }

  return (
    <span className="text-base font-serif leading-relaxed" dangerouslySetInnerHTML={{__html: elem}} />
  );
}

function sanitizeLink(link: string): string {
  const urlRegex = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9- ]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
  return link.replace(urlRegex, function(url) {
    url = addhttp(removeWhiteSpace(url));
    return '<a className="text-blue-400 underline" target="_blank" rel="noopener noreferrer" href="' + url + '">' + url + '</a>';
  })
}

function addhttp(url: string): string {
  if (!url.match(/^[a-zA-Z]+:\/\//)) {
    url = 'http://' + url;
  }
  return url;
}

function removeWhiteSpace(value: string): string {
  return value.replace(/\s+/g, "");
}

function generateGoogleMapsLink(address: string): string {
    return `<a className="text-blue-400 underline" target="_blank" rel="noopener noreferrer" href="http://maps.google.com/maps?q=${encodeURIComponent(address)}">${address}</a>`; 
}
