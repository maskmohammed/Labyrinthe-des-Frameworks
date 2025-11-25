
type Props = {
  message: string | null;
};

export default function MessageBox({ message }: Props) {
  if (!message) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-black/80 text-white px-4 py-3 rounded-lg text-center text-sm w-[300px] shadow-lg z-50">
      {message}
    </div>
  );
}
