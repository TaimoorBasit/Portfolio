import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function updateAdminEmail() {
  try {
    // Update the existing admin user email
    const updatedUser = await prisma.user.update({
      where: { email: 'admin@example.com' },
      data: { email: 'taimoor@portfolio.com' }
    })
    
    console.log('Admin email updated successfully:', updatedUser)
  } catch (error) {
    console.error('Error updating admin email:', error)
  } finally {
    await prisma.$disconnect()
  }
}

updateAdminEmail()