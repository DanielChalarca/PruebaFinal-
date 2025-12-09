import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../../entities/user.entity';
import { Category } from '../../entities/category.entity';
import { Client } from '../../entities/client.entity';
import { Technician } from '../../entities/technician.entity';
import { Ticket } from '../../entities/ticket.entity';
import { Role } from '../../common/enums/role.enum';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_DATABASE || 'techhelpdesk',
  entities: [User, Category, Client, Technician, Ticket],
  synchronize: false,
});

async function seed() {
  await AppDataSource.initialize();

  const userRepository = AppDataSource.getRepository(User);
  const categoryRepository = AppDataSource.getRepository(Category);
  const clientRepository = AppDataSource.getRepository(Client);
  const technicianRepository = AppDataSource.getRepository(Technician);

  console.log('🌱 Iniciando seeders...');

  // Crear usuarios
  const hashedPassword = await bcrypt.hash('password123', 10);

  const admin = userRepository.create({
    name: 'Admin Principal',
    email: 'admin@techhelpdesk.com',
    password: hashedPassword,
    role: Role.ADMIN,
  });
  await userRepository.save(admin);
  console.log('✅ Usuario Admin creado');

  const clientUser1 = userRepository.create({
    name: 'Carlos Gómez',
    email: 'carlos@example.com',
    password: hashedPassword,
    role: Role.CLIENT,
  });
  await userRepository.save(clientUser1);

  const clientUser2 = userRepository.create({
    name: 'Laura Martínez',
    email: 'laura@example.com',
    password: hashedPassword,
    role: Role.CLIENT,
  });
  await userRepository.save(clientUser2);
  console.log('✅ Usuarios Cliente creados');

  const techUser1 = userRepository.create({
    name: 'María López',
    email: 'maria@techhelpdesk.com',
    password: hashedPassword,
    role: Role.TECHNICIAN,
  });
  await userRepository.save(techUser1);

  const techUser2 = userRepository.create({
    name: 'Pedro Sánchez',
    email: 'pedro@techhelpdesk.com',
    password: hashedPassword,
    role: Role.TECHNICIAN,
  });
  await userRepository.save(techUser2);
  console.log('✅ Usuarios Técnico creados');

  // Crear categorías
  const categories = [
    {
      name: 'Solicitud',
      description: 'Solicitudes generales de soporte',
    },
    {
      name: 'Incidente de Hardware',
      description: 'Problemas relacionados con hardware',
    },
    {
      name: 'Incidente de Software',
      description: 'Problemas relacionados con software',
    },
  ];

  for (const cat of categories) {
    const category = categoryRepository.create(cat);
    await categoryRepository.save(category);
  }
  console.log('✅ Categorías creadas');

  // Crear clientes
  const client1 = clientRepository.create({
    name: 'Carlos Gómez',
    company: 'Tech Solutions',
    contactEmail: 'carlos@techsolutions.com',
    user: clientUser1,
  });
  await clientRepository.save(client1);

  const client2 = clientRepository.create({
    name: 'Laura Martínez',
    company: 'Digital Corp',
    contactEmail: 'laura@digitalcorp.com',
    user: clientUser2,
  });
  await clientRepository.save(client2);
  console.log('✅ Clientes creados');

  // Crear técnicos
  const tech1 = technicianRepository.create({
    name: 'María López',
    specialty: 'Redes y Conectividad',
    availability: true,
    user: techUser1,
  });
  await technicianRepository.save(tech1);

  const tech2 = technicianRepository.create({
    name: 'Pedro Sánchez',
    specialty: 'Soporte de Software',
    availability: true,
    user: techUser2,
  });
  await technicianRepository.save(tech2);
  console.log('✅ Técnicos creados');

  console.log('🎉 Seeders completados exitosamente!');
  console.log('\n📝 Credenciales de acceso:');
  console.log('Admin: admin@techhelpdesk.com / password123');
  console.log('Cliente 1: carlos@example.com / password123');
  console.log('Cliente 2: laura@example.com / password123');
  console.log('Técnico 1: maria@techhelpdesk.com / password123');
  console.log('Técnico 2: pedro@techhelpdesk.com / password123');

  await AppDataSource.destroy();
}

seed().catch((error) => {
  console.error('❌ Error en seeders:', error);
  process.exit(1);
});
