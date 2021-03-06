import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { IdeaEntity } from './idea.entity';
import { IdeaDTO } from './idea.dto';

@Injectable()
export class IdeaService {

    constructor(@InjectRepository(IdeaEntity) private ideaRepository: Repository<IdeaEntity>) {}

    async showAll() {
        return await this.ideaRepository.find();
    }

    async create(data: Partial<IdeaDTO>) {
        const idea = await this.ideaRepository.create(data);
        await this.ideaRepository.save(idea);
        return idea;
    }

    async read(id: string) {
        const idea = await this.ideaRepository.findOne({ where: { id: id }});
        
        if (!idea) {
            throw new HttpException('Not found', HttpStatus.NOT_FOUND);
        }

        return idea;
    }

    async update(id: string, data: Partial<IdeaDTO>) {
        const idea = await this.ideaRepository.findOne({ where: { id: id }});

        if (!idea) {
            throw new HttpException('Not found', HttpStatus.NOT_FOUND);
        }

        await this.ideaRepository.update({ id: id }, data);

        const ideaUpdated = await this.ideaRepository.findOne({ where: { id: id }});

        return ideaUpdated;
    }

    async delete(id: string) {
        const idea = await this.ideaRepository.findOne({ where: { id: id }});

        if (!idea) {
            throw new HttpException('Not found', HttpStatus.NOT_FOUND);
        }

        await this.ideaRepository.delete({ id: id });
        
        return idea;
    }
    
}
