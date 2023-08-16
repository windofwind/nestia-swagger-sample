import { INestApplication } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';

import fs from 'fs';

import cp from 'child_process';

export const useSweggerNestia = (app: INestApplication) => {
  cp.execSync('pnpm nestia swagger', {
    stdio: 'inherit',
  });
  const loadSwagger = fs.readFileSync(
    process.env.PWD + '/swagger.json',
    'utf-8',
  );
  const document = JSON.parse(loadSwagger);

  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      showRequestDuration: true,
      filter: true,
    },
  });
};
