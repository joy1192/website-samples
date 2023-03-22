import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class ErrorResponseDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    message: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    code: string;
}