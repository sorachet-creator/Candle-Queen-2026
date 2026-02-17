

## แผนปรับปรุง: ตัดส่วนพระราชกรณียกิจ และเพิ่มปุ่มลิงก์ไปกรมประชาสัมพันธ์

### สิ่งที่จะเปลี่ยน

**ตัดออก:**
- ลบ `RoyalDutiesSection` ออกจากหน้า Index
- ลบลิงก์ "พระราชกรณียกิจ" ออกจาก Header navigation

**เพิ่มแทน:**
- เพิ่ม Section ใหม่ขนาดกะทัดรัด ด้านล่าง Hero Section ก่อน Footer
- ออกแบบเป็น Banner สวยงาม มีข้อความเชิญชวนศึกษาพระราชกรณียกิจเพิ่มเติม พร้อมปุ่มลิงก์ไปยังเว็บกรมประชาสัมพันธ์ (https://www.prd.go.th)
- ปุ่มมีสไตล์โทนทองตามธีมเดิม เปิดแท็บใหม่เมื่อคลิก

### ดีไซน์ Section ใหม่

```text
┌─────────────────────────────────────────────┐
│                                             │
│      ─── ◇ ───                              │
│                                             │
│   ศึกษาพระราชกรณียกิจเพิ่มเติม              │
│   ข้อความสั้นๆ เชิญชวน                      │
│                                             │
│   [ ── เยี่ยมชมเว็บไซต์กรมประชาสัมพันธ์ ── ]│
│         (ปุ่มโทนทอง + ไอคอน ExternalLink)   │
│                                             │
└─────────────────────────────────────────────┘
```

- พื้นหลังใช้ gradient สีเข้มอ่อนๆ พร้อม border บน-ล่าง โทนทอง
- มี animation fade-in เมื่อ scroll ลงมาถึง (framer-motion)
- รองรับ 3 ภาษา (TH, EN, CN)

### รายละเอียดทางเทคนิค

**ไฟล์ที่แก้ไข:**

1. **`src/pages/Index.tsx`** -- ลบ `RoyalDutiesSection` ออก, เพิ่ม Component ใหม่ `ExternalLinkBanner` แทน

2. **`src/components/ExternalLinkBanner.tsx`** (สร้างใหม่) -- Section เรียบง่ายที่มี:
   - หัวข้อเชิญชวน
   - ข้อความอธิบายสั้นๆ
   - ปุ่มลิงก์ไป prd.go.th เปิด tab ใหม่ (`target="_blank" rel="noopener noreferrer"`)
   - ใช้ framer-motion สำหรับ scroll animation

3. **`src/components/Header.tsx`** -- ลบลิงก์ "พระราชกรณียกิจ" ออกจาก nav (คงไว้เฉพาะลิงก์ "ปล่อยโคม")

4. **`src/lib/translations.ts`** -- เพิ่มข้อความสำหรับ Banner ใหม่ทั้ง 3 ภาษา, ลบข้อความ `royalDuties` และ `projects` ออก

5. **`src/components/HeroSection.tsx`** -- ลบปุ่ม scroll down ที่ชี้ไป `#royal-duties` หรือเปลี่ยนให้ชี้ไปที่ Section ใหม่แทน

