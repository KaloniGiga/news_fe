import MuiButton from "../ui/MuiButton/MuiButton";

const PortalDescription = () => {
  return (
    <div className="w-full px-4 py-4 rounded-xl bg-white flex flex-col gap-y-2 border-[1px] border-[rgba(0,0,0,0.1)]">
      <h3 className="text-[22px] font-bold">News Portal is community is 1,239 amazing news portal.</h3>
      <h6 className="text-[16px] text-[rgba(0,0,0,0.7)]">
        We are a place where news journalist, writer share, stay-up-to-date and grow themselves.
      </h6>
      <MuiButton label="Create Account" variant="outlined" />
      <MuiButton label="Login" variant="text" />
    </div>
  );
};

export default PortalDescription;
