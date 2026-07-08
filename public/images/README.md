# Image Assets Guide

Place your exported Figma images in these folders:

## 📁 Folder Structure

```
public/images/
├── logos/
│   ├── tkh-logo.png              (TKH main logo - white version for dark bg)
│   ├── tkh-logo-dark.png         (TKH logo - dark version for light bg)
│   ├── coventry-logo.png         (Coventry University logo - white)
│   └── nova-logo.png             (NOVA University logo - white)
│
├── hero/
│   └── hero-background.jpg       (Main hero background - campus aerial view)
│
├── campus/
│   ├── campus-building.jpg       (Main campus building for Experience section)
│   ├── coventry-campus.jpg       (Coventry University campus photo)
│   └── nova-campus.jpg           (NOVA University campus photo)
│
├── majors/
│   ├── design-media.jpg          (Design & Media program image)
│   ├── engineering.jpg           (Engineering program image)
│   ├── psychology.jpg            (Psychology program image)
│   ├── business.jpg              (Business program image)
│   └── medicine.jpg              (Medicine program image)
│
├── events/
│   ├── nova-open-day.jpg         (NOVA Open Day event image)
│   ├── innovation-hub.jpg        (Cairo Innovation Hub event image)
│   └── orientation.jpg           (Orientation event image)
│
├── testimonials/
│   ├── graduate-1.jpg            (Graduate photo 1)
│   ├── graduate-2.jpg            (Graduate photo 2)
│   ├── graduate-3.jpg            (Graduate photo 3)
│   ├── graduate-4.jpg            (Graduate photo 4)
│   └── graduate-5.jpg            (Graduate photo 5)
│
└── news/
    ├── news-1.jpg                (News article thumbnail 1)
    ├── news-2.jpg                (News article thumbnail 2)
    └── news-3.jpg                (News article thumbnail 3)
```

## 📋 Export Settings from Figma

When exporting from Figma:

1. **Format**: PNG or JPG
2. **Scale**: 2x (for retina displays)
3. **Quality**: High (for photos), Lossless (for logos)

### Recommended Sizes:

- **Logos**:
  - TKH Logo: 200x80px (maintain aspect ratio)
  - Partner Logos: 300x100px

- **Hero Background**: 1920x1080px (Full HD)

- **Campus Photos**: 800x600px

- **Major Cards**: 600x400px

- **Event Images**: 600x400px

- **Testimonial Photos**: 400x400px (square)

- **News Thumbnails**: 400x300px

## 🎨 Image Optimization Tips

After placing images:

1. Compress them using TinyPNG or similar
2. Keep file sizes under 500KB for photos
3. Use WebP format if possible (Next.js will auto-optimize)

## ✅ Checklist

After placing all images, you should have:

- [ ] 4 logo files
- [ ] 1 hero background
- [ ] 3 campus photos
- [ ] 5 major program images
- [ ] 3 event images
- [ ] 5 graduate photos
- [ ] 3 news thumbnails

**Total: ~24 image files**

Once you place the images, the components will automatically use them!
