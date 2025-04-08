# Mark's Minerals Website

A modern, responsive website for Mark's Minerals, featuring a comprehensive collection of mineral specimens, educational resources, and appointment booking capabilities.

## Features

- Responsive design that works on all devices
- Interactive product catalog with detailed specimen information
- Educational resources section with guides and articles
- Appointment booking system
- Contact form with location information
- Modern UI with smooth animations and transitions

## Project Structure

```
marks-minerals-vt/
├── assets/
│   ├── css/          # Stylesheets
│   ├── js/           # JavaScript files
│   └── images/       # Image assets
├── pages/            # HTML pages
└── index.html        # Homepage
```

## Setup

1. Clone the repository:
   ```bash
   git clone [repository-url]
   ```

2. Navigate to the project directory:
   ```bash
   cd marks-minerals-vt
   ```

3. Start a local server:
   ```bash
   python -m http.server 8000
   ```
   or
   ```bash
   npx http-server -p 8000
   ```

4. Open your browser and visit:
   ```
   http://localhost:8000
   ```

## Technologies Used

- HTML5
- CSS3
- JavaScript (ES6+)
- Font Awesome Icons
- Google Fonts

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

Mark's Minerals - [Contact Information]

## Gallery Features

The mineral gallery includes several advanced features for viewing and interacting with mineral specimens:

### Image Gallery with Zoom
- Click on any mineral image to open it in the lightbox view
- Use the zoom buttons (+/-) to zoom in and out for detailed examination
- Keyboard shortcuts: '+' to zoom in, '-' to zoom out

### 360-Degree Rotation
- Some specimens (marked with a rotation icon) support 360-degree viewing
- Click the rotation button in the lightbox to toggle 360-degree mode
- The specimen will automatically rotate to show all angles
- Keyboard shortcut: 'r' to toggle 360-degree view

### Lightbox
- Full-screen viewing mode for detailed examination
- Navigate between specimens using the arrow buttons or keyboard arrows
- Click outside the image or press 'Esc' to close the lightbox

### Filtering System
- Filter minerals by type (crystals, gems, specimens, fossils, meteorites)
- Filter by price range
- Filter by location of origin
- Filter by characteristics (rare, large, colorful, transparent, etc.)
- Multiple filters can be applied simultaneously

## Adding 360-Degree Images

To add 360-degree rotation capability to a mineral:

1. Create a series of images showing the mineral from different angles (8-12 images recommended)
2. Place the images in the `assets/images/minerals/360` directory
3. Add the `data-360-images` attribute to the mineral item in `pages/products.html` with a JSON array of image paths:

```html
<div class="mineral-item" 
     data-category="gems" 
     data-price="high" 
     data-location="colombia" 
     data-characteristics="rare,faceted,transparent" 
     data-360-images='["../assets/images/minerals/360/emerald-1.jpg", "../assets/images/minerals/360/emerald-2.jpg", ...]'>
```

## Adding New Minerals

To add a new mineral to the gallery:

1. Add the mineral image to the `assets/images/minerals` directory
2. Add a new mineral item to the `mineral-grid` section in `pages/products.html`
3. Include appropriate data attributes for filtering:
   - `data-category`: Mineral type
   - `data-price`: Price range (low, medium, high)
   - `data-location`: Origin location
   - `data-characteristics`: Comma-separated list of characteristics

Example:
```html
<div class="mineral-item" 
     data-category="crystals" 
     data-price="medium" 
     data-location="brazil" 
     data-characteristics="colorful,transparent">
    <div class="mineral-image-container">
        <img class="lazy" data-src="../assets/images/minerals/your-mineral.jpg" alt="Your Mineral" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7">
    </div>
    <div class="mineral-info">
        <h3>Your Mineral</h3>
        <p class="mineral-description">Description of your mineral</p>
        <p class="mineral-price">$XX.XX</p>
        <button type="button" class="btn-details">View Details</button>
    </div>
</div>
```
 