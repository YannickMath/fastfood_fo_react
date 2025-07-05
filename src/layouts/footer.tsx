export default function Footer() {
  return (
    <footer className="w-full h-1/5 bg-gray-800 text-white ">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} FastFood. All rights reserved.
        </p>
        <p className="text-xs mt-2">Made with ❤️ by YM</p>
      </div>
    </footer>
  );
}
