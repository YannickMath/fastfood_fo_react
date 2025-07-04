export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white p-4 mt-8">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} FastFood. All rights reserved.
        </p>
        <p className="text-xs mt-2">Made with ❤️ by Your Name</p>
      </div>
    </footer>
  );
}
