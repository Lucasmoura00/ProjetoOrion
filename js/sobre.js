// O texto de apresentação fica no HTML. Este arquivo cuida da exportação.
startPage(() => {});
document.querySelector('[data-action="export"]').addEventListener("click", () => {
  const blob = new Blob(
    [JSON.stringify({ exportedAt: new Date().toISOString(), ...data }, null, 2)],
    { type: "application/json" },
  );
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `orion-crm-${dateOffset(0)}.json`;
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  notify("Cópia dos dados exportada.");
});
