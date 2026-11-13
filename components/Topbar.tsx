import { IoCallOutline, IoLocationOutline, IoTimeOutline } from "react-icons/io5";
import { getSite } from "@/lib/content";
import { telHref } from "@/lib/site";

export default async function Topbar() {
  const site = await getSite();
  const { primary, secondary } = site.phones;

  return (
    <div className="topbar">
      <div className="container">
        <address className="topbar-item">
          <div className="icon">
            <IoLocationOutline aria-hidden="true" />
          </div>
          <span className="span">{site.address.short}</span>
        </address>

        <div className="separator" />

        <div className="topbar-item item-2">
          <div className="icon">
            <IoTimeOutline aria-hidden="true" />
          </div>
          <span className="span">Daily : {site.hours}</span>
        </div>

        {[primary, secondary].map((phone, i) => (
          <PhoneItem key={i} phone={phone} withSeparator={i > 0} />
        ))}
      </div>
    </div>
  );
}

function PhoneItem({
  phone,
  withSeparator,
}: {
  phone: { label: string; tel: string };
  withSeparator: boolean;
}) {
  return (
    <>
      {withSeparator && <div className="separator" />}
      <a href={telHref(phone.tel)} className="topbar-item link">
        <div className="icon">
          <IoCallOutline aria-hidden="true" />
        </div>
        <span className="span">{phone.label}</span>
      </a>
    </>
  );
}
