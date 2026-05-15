import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-50 text-gray-800 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-12 text-center">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 justify-items-center">
          {/* About */}
          <div>
            <h3 className="font-semibold mb-3">About</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>About Second Hand Land</li>
              <li>Our Mission</li>
              <li>Sustainability</li>
              <li>Blog / Tips</li>
            </ul>
          </div>

          {/* Buy & Sell */}
          <div>
            <h3 className="font-semibold mb-3">Buy & Sell</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>How to Buy</li>
              <li>How to Sell</li>
              <li>Seller Guidelines</li>
              <li>Pricing / Fees</li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold mb-3">Support</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>Help Center</li>
              <li>Contact Us</li>
              <li>Shipping & Returns</li>
              <li>Terms & Privacy</li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="font-semibold mb-3">Connect</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>Facebook</li>
              <li>Instagram</li>
              <li>TikTok</li>
              <li>Email Newsletter</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-200 pt-6">
          <p className="font-semibold italic">Second Hand Land — Giving old things a new story</p>
          <p className="text-xs text-gray-500 mt-2">
            © 2025 Second Hand Land. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
