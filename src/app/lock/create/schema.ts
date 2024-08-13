import { z } from "zod";
import moment from "moment"; // Make sure to import moment
import { ethers } from "ethers";

const isAddress = (address: string | undefined) =>
  ethers.isAddress(address || "");

const LockSchema = z
  .object({
    tokenOrLPTokenAddress: z
      .string()
      .nonempty({ message: "Address Required" })
      .refine(isAddress, { message: "Invalid Address" })
      .describe("Token Address"),

    title: z.string().nonempty({ message: "Lock Name is required" }),

    useAnotherOwner: z.boolean(),
    isvesting: z.boolean(),

    ownerAddress: z.string().optional(),

    amount: z
      .string()
      .min(1)
      .refine(
        (value) => {
          const inputValue = value || "";
          const reg = new RegExp(/^[+-]?\d+(\.\d+)?$/);
          return reg.test(inputValue) && parseFloat(inputValue) > 0;
        },
        { message: "Please Enter Valid Amount!" }
      ),

    lockUntil: z.date(),
    TGEDate: z.date().optional(),
    TGEPercentage: z.number().optional(),
    CycleTime: z.number().optional(),
    CycleReleasePercent: z.number().optional(),
  })
  .superRefine((data, ctx) => {
    if (
      data.useAnotherOwner &&
      (!data.ownerAddress || !isAddress(data.ownerAddress))
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Invalid Address",
        path: ["ownerAddress"],
      });
    }
    if (
      !data.isvesting &&
      (!data.lockUntil || data.lockUntil < moment.utc().add(15, "m").toDate())
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Lock time should be at least 15 minutes in future",
        path: ["lockUntil"],
      });
    }
    if (
      data.isvesting &&
      (!data.TGEDate || data.TGEDate < moment.utc().add(15, "m").toDate())
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Time should be at least 15 minutes in future",
        path: ["TGEDate"],
      });
    }
    if (
      data.isvesting &&
      (data.TGEPercentage == null ||
        data.TGEPercentage <= 0 ||
        data.TGEPercentage > 99)
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "TGE Percentage Required and must be between 1 and 99",
        path: ["TGEPercentage"],
      });
    }
    if (data.isvesting && (data.CycleTime == null || data.CycleTime <= 0)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Vesting cycle time Required and must be greater than 0",
        path: ["CycleTime"],
      });
    }
    if (
      data.isvesting &&
      (data.CycleReleasePercent == null ||
        data.CycleReleasePercent <= 0 ||
        data.CycleReleasePercent > 99)
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message:
          "Vesting cycle release percent Required and must be between 1 and 99",
        path: ["CycleReleasePercent"],
      });
    }
  });

export default LockSchema;
