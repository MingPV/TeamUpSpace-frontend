# # ---------- Stage 1: Build ----------
FROM node:20-alpine AS builder

# กำหนด working directory
WORKDIR /app

# คัดลอกไฟล์ dependencies ก่อน เพื่อใช้ layer caching
COPY package*.json ./
# ถ้ามี yarn.lock หรือ pnpm-lock.yaml ก็สามารถเปลี่ยนได้ เช่น:
# COPY yarn.lock ./

# ติดตั้ง dependencies
RUN npm install

# คัดลอกโค้ดทั้งหมดเข้าไปใน container
COPY . .

# สร้าง build production
RUN npm run build

# ---------- Stage 2: Run ----------
FROM node:20-alpine AS runner

WORKDIR /app

# คัดลอกไฟล์ที่จำเป็นจาก builder stage
COPY --from=builder /app/package*.json ./
RUN npm install --omit=dev

# คัดลอกไฟล์ build และ public assets
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Expose port 3000
EXPOSE 3000

# รันแอป
CMD ["npm", "start"]


# ---------- Dev Stage ----------
# FROM node:18-alpine

# # กำหนด working directory
# WORKDIR /app

# # คัดลอก dependencies
# COPY package*.json ./
# RUN npm install

# # คัดลอกโค้ดทั้งหมด
# COPY . .

# # Expose port 3000
# EXPOSE 3000

# # ใช้ dev server ของ Next.js (จะ watch ไฟล์, hot reload, และแสดง error)
# CMD ["npm", "run", "dev"]
