import { motion } from "framer-motion";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

export function ComparisonSection() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#2C3E50] mb-6">
            What’s the Difference Between Single-Zone and Multi-Zone Heat Pumps?
          </h2>
          <p className="text-lg text-slate-600">
            Understand the differences to choose the right system for your home comfort needs.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100">
            <h3 className="text-2xl font-bold text-[#2C3E50] mb-4 text-[#6CBE45]">Single-Zone Mini-Split Heat Pumps</h3>
            <p className="text-slate-600 mb-6">
              A single-zone heat pump system consists of one outdoor compressor unit connected to one indoor air handler. Ideal for spaces up to 1,500 square feet.
            </p>
            <div className="space-y-4 text-sm">
              <p><strong>Best Applications:</strong> Bedrooms, additions, sunrooms, converted garages, 400-1,500 sq ft.</p>
              <p><strong>Specifications:</strong> 9,000-24,000 BTU, 20-33 SEER, Operates to -30°C.</p>
              <p><strong>Cost & Time:</strong> $3,500 - $6,500 installed, 4-8 hours installation.</p>
              <p><strong>Savings:</strong> Potential 30-50% savings vs oil or electric baseboard.</p>
              <p><strong>Noise:</strong> 19-24 decibels (whisper-quiet).</p>
              <p className="text-[#6CBE45] font-bold italic mb-6">Annual Operating Cost: $300-$600 per year.</p>
              <Button 
                onClick={() => window.open('https://scheduling.greenfootenergy.ca/', '_blank')}
                className="w-full bg-[#6CBE45] hover:bg-[#6CBE45]/90 text-white font-bold py-6 rounded-xl shadow-md transition-all group"
              >
                Get Single-Zone Quote
                <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100">
            <h3 className="text-2xl font-bold text-[#2C3E50] mb-4 text-[#1E5AA8]">Multi-Zone Mini-Split Heat Pumps</h3>
            <p className="text-slate-600 mb-6">
              Connects one outdoor compressor to 2-5 indoor air handlers. Each zone operates independently with its own thermostat.
            </p>
            <div className="space-y-4 text-sm">
              <p><strong>Best Applications:</strong> Whole-home (1,500-5,000+ sq ft), multi-story homes, homes without ductwork.</p>
              <p><strong>Specifications:</strong> 24,000-60,000 BTU, 18-30 SEER, 2-5 zones per unit.</p>
              <p><strong>Cost & Time:</strong> $8,000 - $16,000 installed, 2-3 days installation.</p>
              <p><strong>Savings:</strong> Potential 30-50% savings vs oil or electric baseboard.</p>
              <p className="text-[#1E5AA8] font-bold italic mb-6">Annual Operating Cost: $1,200-$2,400 per year.</p>
              <Button 
                onClick={() => window.open('https://scheduling.greenfootenergy.ca/', '_blank')}
                className="w-full bg-[#1E5AA8] hover:bg-[#1E5AA8]/90 text-white font-bold py-6 rounded-xl shadow-md transition-all group"
              >
                Get Multi-Zone Quote
                <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
          <Table className="w-full text-sm">
            <TableHeader>
              <TableRow className="bg-[#333333] hover:bg-[#333333] border-none">
                <TableHead className="py-6 px-6 text-white text-lg font-bold">Feature</TableHead>
                <TableHead className="py-6 px-6 text-[#8dc63f] text-lg font-bold">Single-Zone</TableHead>
                <TableHead className="py-6 px-6 text-[#1E5AA8] text-lg font-bold">Multi-Zone</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                { feature: "Outdoor Units", single: "1 unit", multi: "1 unit" },
                { feature: "Indoor Units", single: "1 unit", multi: "2-5 units" },
                { feature: "Coverage Area", single: "400-1,500 sq ft", multi: "1,500-5,000+ sq ft" },
                { feature: "Installation Cost", single: "$3,500-$6,500", multi: "$8,000-$16,000" },
                { feature: "Installation Time", single: "4-8 hours (same day)", multi: "2-3 days" },
                { feature: "Annual Operating Cost", single: "$300-$600/year", multi: "$1,200-$2,400/year" },
                { feature: "Best For", single: "Single rooms, additions", multi: "Whole-home heating/cooling" },
                { feature: "Energy Savings", single: "20-30% vs baseboard", multi: "30-50% vs oil/baseboard" },
                { feature: "Temperature Control", single: "One thermostat", multi: "Independent zone control" },
              ].map((row, index) => (
                <TableRow key={index} className="hover:bg-slate-50 border-slate-100">
                  <TableCell className="font-semibold text-slate-700 py-4 px-6">{row.feature}</TableCell>
                  <TableCell className="py-4 px-6">{row.single}</TableCell>
                  <TableCell className="py-4 px-6 font-medium text-slate-900">{row.multi}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mt-12">
          <div className="bg-white p-8 rounded-2xl border-l-4 border-[#6CBE45] shadow-sm">
            <h3 className="text-xl font-bold text-[#2C3E50] mb-3">Which heat pump system should I choose?</h3>
            <p className="text-slate-600">
              Choose <strong>single-zone</strong> if: You need heating/cooling for one room, have a limited budget ($3,500-$6,500), or want to test heat pump technology.
            </p>
          </div>
          <div className="bg-white p-8 rounded-2xl border-l-4 border-[#1E5AA8] shadow-sm">
            <h3 className="text-xl font-bold text-[#2C3E50] mb-3">Whole-Home Comfort</h3>
            <p className="text-slate-600">
              Choose <strong>multi-zone</strong> if: You need whole-home comfort, want to replace your existing heating system, or require different temperatures in different rooms.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
