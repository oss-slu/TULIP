import { prisma, disconnect } from '../util/prisma.js'

const clinics = [
  {
    name: "Children's Permanency",
    description: 'Legal support for children and families navigating permanency matters.',
  },
  {
    name: 'Civil Litigation',
    description: 'Representation and guidance for civil legal disputes.',
  },
  {
    name: 'Criminal Defense',
    description: 'Legal assistance for people facing criminal charges.',
  },
  {
    name: 'Entrepreneurship and Community Development',
    description: 'Support for small businesses, nonprofits, and community organizations.',
  },
  {
    name: 'Human Rights at Home Litigation',
    description: 'Advocacy and litigation related to civil and human rights.',
  },
  {
    name: 'Medical-Legal Partnership',
    description: 'Legal help that supports health, wellbeing, and access to care.',
  },
]

async function getClinic(name) {
  const existing = await prisma.clinic.findFirst({ where: { name } })
  const data = clinics.find((clinic) => clinic.name === name)

  return existing
    ? prisma.clinic.update({ where: { id: existing.id }, data })
    : prisma.clinic.create({ data })
}

async function main() {
  const clinicRecords = await Promise.all(clinics.map(({ name }) => getClinic(name)))
  const clinicByName = Object.fromEntries(
    clinicRecords.map((clinic) => [clinic.name, clinic]),
  )

  const admin = await prisma.user.upsert({
    where: { email: 'admin@tulip.slu.edu' },
    update: { firstName: 'TULIP', lastName: 'Administrator', admin: true },
    create: { email: 'admin@tulip.slu.edu', firstName: 'TULIP', lastName: 'Administrator', admin: true },
  })

  const providers = await Promise.all([
    ['maria.santos@tulip.slu.edu', 'Maria', 'Santos', "Children's Permanency"],
    ['james.wright@tulip.slu.edu', 'James', 'Wright', 'Civil Litigation'],
    ['amina.patel@tulip.slu.edu', 'Amina', 'Patel', 'Criminal Defense'],
    ['brandon.cho@tulip.slu.edu', 'Brandon', 'Cho', 'Entrepreneurship and Community Development'],
    ['sophia.green@tulip.slu.edu', 'Sophia', 'Green', 'Human Rights at Home Litigation'],
    ['daniel.hall@tulip.slu.edu', 'Daniel', 'Hall', 'Medical-Legal Partnership'],
  ].map(async ([email, firstName, lastName, clinicName]) => {
    const clinicId = clinicByName[clinicName].id
    const provider = await prisma.user.upsert({
      where: { email },
      update: { firstName, lastName },
      create: { email, firstName, lastName },
    })
    await prisma.userClinicGroup.deleteMany({ where: { userId: provider.id, clinicId } })
    await prisma.userClinicGroup.create({ data: { userId: provider.id, clinicId, role: 'PROVIDER' } })
    return provider
  }))

  await prisma.userClinicGroup.deleteMany({ where: { userId: admin.id } })
  await prisma.userClinicGroup.create({
    data: { userId: admin.id, clinicId: clinicByName["Children's Permanency"].id, role: 'ADMIN' },
  })

  const intakeSeeds = [
    {
      email: 'alex.rivera@example.test', firstName: 'Alex', lastName: 'Rivera',
      clinicId: clinicByName['Medical-Legal Partnership'].id,
      clinicName: 'Medical-Legal Partnership', status: 'NEW',
      street_address: '100 Market Street', city: 'St. Louis', state: 'MO', country: 'US',
      zipCode: 63101, mobilePhone: '555-010-1001', homePhone: '555-010-1002',
      ssn: 1, dob: new Date('1991-06-15'),
    },
    {
      email: 'jordan.lee@example.test', firstName: 'Jordan', lastName: 'Lee',
      clinicId: clinicByName['Civil Litigation'].id,
      clinicName: 'Civil Litigation', status: 'IN_PROGRESS',
      street_address: '200 Olive Street', city: 'St. Louis', state: 'MO', country: 'US',
      zipCode: 63103, mobilePhone: '555-010-2001', homePhone: '555-010-2002',
      ssn: 2, dob: new Date('1987-11-03'),
    },
  ]

  for (const intake of intakeSeeds) {
    const user = await prisma.user.upsert({
      where: { email: intake.email },
      update: { firstName: intake.firstName, lastName: intake.lastName },
      create: { email: intake.email, firstName: intake.firstName, lastName: intake.lastName },
    })
    await prisma.userClinicGroup.deleteMany({
      where: { userId: user.id, clinicId: intake.clinicId },
    })
    await prisma.userClinicGroup.create({ data: { userId: user.id, clinicId: intake.clinicId, role: 'CLIENT' } })
    await prisma.intakeForm.upsert({
      where: { email: intake.email },
      update: { ...intake, userId: user.id },
      create: { ...intake, userId: user.id },
    })
  }

  await prisma.logs.deleteMany({
    where: { message: 'TULIP seed data initialized.', from: 'seed', to: 'database' },
  })
  await prisma.logs.create({
    data: { userId: admin.id, message: 'TULIP seed data initialized.', from: 'seed', to: 'database' },
  })

  console.log(
    `Seeded ${clinics.length} clinics, ${providers.length} providers, `
      + `and ${intakeSeeds.length} intake forms.`,
  )
}

main()
  .catch((error) => {
    console.error('Database seed failed:', error)
    process.exitCode = 1
  })
  .finally(disconnect)
