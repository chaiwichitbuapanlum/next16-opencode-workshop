# React Hook Form Guidelines (Next.js + TypeScript)

## Core Principles
- ใช้ `react-hook-form` เป็น **single source of truth** สำหรับ state ของฟอร์ม
- ใช้ `uncontrolled inputs` เป็นค่าเริ่มต้น (`register`) และใช้ `Controller` เมื่อจำเป็นเท่านั้น
- ใช้ validation ตามมาตรฐาน HTML (`required`, `minLength`, `pattern`) ร่วมกับ schema validation (เช่น `zod`)
- แยก logic ของฟอร์ม (schema, defaultValues, resolver) ออกจาก component UI
- ทุกฟอร์มต้องมี `onSubmit` ที่ handle success/errors อย่างเหมาะสม

---

## Setup & Structure

- ติดตั้งแพ็กเกจหลัก  
  - `react-hook-form`  
  - หากใช้ schema validation: `@hookform/resolvers` + `zod`

- โครงสร้างไฟล์ที่แนะนำ:
  - `.../UserForm.tsx` (UI)
  - `.../userForm.schema.ts` (zod schema)
  - `.../userForm.types.ts` (Form types)
  - `.../userForm.defaults.ts` (defaultValues)

---

## useForm Setup

```ts
type UserFormValues = z.infer<typeof userFormSchema>;

const form = useForm<UserFormValues>({
  resolver: zodResolver(userFormSchema),
  defaultValues,
  mode: 'onSubmit',
});

- ใช้ mode: 'onSubmit' เป็นค่ามาตรฐาน
- หลีกเลี่ยงการสร้าง useForm() ซ้ำใน render tree ที่ re-render บ่อย ๆ
- ตั้งค่า type ให้ชัดเจนเสมอ (useForm<UserFormValues>)

## Register & Naming
- ใช้ register กับ input แบบมาตรฐาน
- `<input {...register('email')} />`

- ตั้งชื่อ field ให้สื่อความหมาย เช่น:
- `firstName`, `lastName` แทน `name1`, `name2`

- รองรับ object แบบ nested:
<input {...register('address.line1')} />

## Validation Rules
- ใช้ schema (zod) เป็นแหล่งความจริงเดียวสำหรับ validation
- กำหนด rules เพิ่มเติมใน register() เมื่อจำเป็น:
  - `<input {...register('username', { required: true, minLength: 3 })} />`
- หลีกเลี่ยงการซ้ำซ้อนระหว่าง schema กับ rules ใน register()
## Error Handling
- แสดง error messages จาก formState.errors
- `<p>{formState.errors.email?.message}</p>`
- ใช้ `setError` เพื่อกำหนด error programmatically เมื่อจำเป็น
- `form.setError('username', { type: 'manual', message: 'Username taken' });`
## Submission Handling
- ใช้ `handleSubmit` สำหรับการส่งฟอร์ม
- `form.handleSubmit(onSubmit, onError)`
- แยกฟังก์ชัน `onSubmit` และ `onError` ออกจาก component UI
- จัดการ loading state ด้วย `formState.isSubmitting`
- ป้องกันการส่งซ้ำด้วยการ disable ปุ่ม submit ขณะกำลังส่ง
- `<button type="submit" disabled={formState.isSubmitting}>Submit</button>`
## Controller Usage
- ใช้ `Controller` สำหรับ third-party components ที่ไม่รองรับ ref forwarding
```ts
<Controller
  name="dateOfBirth"
  control={form.control}
  render={({ field }) => (
    <DatePicker {...field} selected={field.value} onChange={field.onChange} />
  )}
/>
- หลีกเลี่ยงการใช้ Controller กับ input ธรรมดา
- ตั้งชื่อ field ให้สื่อความหมายเหมือนกับการใช้ register()
## Performance Optimization
- ใช้ `useFormContext` ในกรณีที่มีฟอร์มซับซ้อนหลายชั้น
- ใช้ `shouldUnregister: true` ใน useForm() หากต้องการล้างค่าฟิลด์ที่ถูกถอดออก
- ใช้ `useWatch` เพื่อติดตามค่าฟิลด์เฉพาะที่จำเป็น
```ts       
const watchedValue = useWatch({
  control: form.control,
  name: 'someField',
});
``` 
- หลีกเลี่ยงการ re-render ที่ไม่จำเป็นด้วยการแยก component ย่อย
## Testing  
- ทดสอบฟอร์มด้วย `@testing-library/react`
- ทดสอบการ submit, validation errors, default values
- ใช้ `react-hook-form`'s `formState` เพื่อตรวจสอบสถานะของฟอร์มใน tests
```ts
expect(form.formState.isValid).toBe(true);
```
- Mock ฟังก์ชัน `onSubmit` เพื่อยืนยันว่าถูกเรียกด้วยค่าที่ถูกต้อง
## Additional Tips
- ใช้ `reset()` เพื่อรีเซ็ตฟอร์มหลังการ submit สำเร็จ
- ใช้ `getValues()` และ `setValue()` เพื่อจัดการค่าฟิลด์แบบโปรแกรม
- ใช้ `watch()` เพื่อติดตามค่าฟิลด์แบบเรียลไทาม์
- จัดการฟอร์มหลายขั้นตอนด้วยการแบ่ง useForm ออกเป็นหลาย instance หรือใช้ state ภายนอก
- อ่านเอกสารอย่างสม่ำเสมอเพื่ออัปเดตแนวทางปฏิบัติที่ดีที่สุดตามเวอร์ชันล่าสุดของ React Hook Form


`````````type UserFormValues = z.infer<typeof userFormSchema>;  
const form = useForm<UserFormValues>({
  resolver: zodResolver(userFormSchema),
  defaultValues,
  mode: 'onSubmit',
});
```
```ts
<Controller
  name="dateOfBirth"
  control={form.control}
  render={({ field }) => (
    <DatePicker {...field} selected={field.value} onChange={field.onChange} />
  )}
/>
```
```ts
const watchedValue = useWatch({
  control: form.control,
  name: 'someField',
});
``` 
```ts   
expect(form.formState.isValid).toBe(true);
``` 

