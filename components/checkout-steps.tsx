"use client"

import { motion } from "framer-motion"
import { Check } from "lucide-react"

interface CheckoutStepsProps {
  currentStep: number
  steps: string[]
}

export function CheckoutSteps({ currentStep, steps }: CheckoutStepsProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step} className="flex items-center">
            <div className="flex items-center">
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors ${
                  index < currentStep
                    ? "bg-secondary border-secondary text-secondary-foreground"
                    : index === currentStep
                      ? "border-secondary text-secondary"
                      : "border-border text-muted-foreground"
                }`}
              >
                {index < currentStep ? (
                  <Check className="h-5 w-5" />
                ) : (
                  <span className="text-sm font-medium">{index + 1}</span>
                )}
              </motion.div>
              <div className="ml-3 hidden sm:block">
                <p
                  className={`text-sm font-medium ${
                    index <= currentStep ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {step}
                </p>
              </div>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`hidden sm:block w-16 h-0.5 mx-4 ${index < currentStep ? "bg-secondary" : "bg-border"}`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
